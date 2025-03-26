
import { useState, useEffect, useRef } from "react";

const stats = [
  {
    value: 1300000000,
    formatter: (val: number) => (val / 1000000000).toFixed(1) + "B",
    label: "Tons of food wasted yearly",
    suffix: "tons",
  },
  {
    value: 30,
    formatter: (val: number) => val.toString(),
    label: "Percent of food production wasted",
    suffix: "%",
  },
  {
    value: 3500,
    formatter: (val: number) => val.toString(),
    label: "Calories per person wasted daily",
    suffix: "",
  },
  {
    value: 750000000000,
    formatter: (val: number) => "$" + (val / 1000000000).toString(),
    label: "Global economic impact annually",
    suffix: "B",
  },
];

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // ms
    const interval = 20; // ms
    const steps = duration / interval;

    const incrementValues = stats.map((stat) => stat.value / steps);
    let currentCounts = [...counts];

    const timer = setInterval(() => {
      currentCounts = currentCounts.map((count, i) => {
        const newCount = count + incrementValues[i];
        return Math.min(newCount, stats[i].value);
      });
      setCounts(currentCounts);

      if (currentCounts.every((count, i) => count >= stats[i].value)) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section id="statistics" className="py-20 bg-sage-50" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 bg-sage-100 text-sage-800 rounded-full text-sm font-medium mb-4 opacity-0 animate-fade-in">
            The Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 opacity-0 animate-fade-in animate-delay-100">
            Why Food Waste Matters
          </h2>
          <p className="text-gray-600 opacity-0 animate-fade-in animate-delay-200">
            Food waste has enormous environmental, economic, and social impacts.
            Together, we can make a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-panel rounded-2xl p-8 text-center opacity-0 animate-fade-in"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl md:text-5xl font-bold text-sage-700">
                  {stat.formatter(counts[index])}
                </span>
                {stat.suffix && (
                  <span className="text-xl ml-1 text-sage-600">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
