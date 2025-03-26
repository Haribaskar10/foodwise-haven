
const Hero = () => {
  return (
    <section className="pt-32 pb-20 md:py-36 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block py-1 px-3 bg-sage-100 text-sage-800 rounded-full text-sm font-medium mb-4 opacity-0 animate-fade-in">
            Reduce Food Waste. Save Money. Save the Planet.
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance opacity-0 animate-fade-in animate-delay-100">
            Transforming How We <span className="text-sage-600">Manage Food</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 opacity-0 animate-fade-in animate-delay-200">
            Our mission is to reduce food waste through smart technology. 
            Track your pantry, discover new recipes, and connect with 
            community initiatives to make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in animate-delay-300">
            <button className="bg-sage-600 hover:bg-sage-700 text-white font-semibold rounded-full px-8 py-3 transition-all duration-300 transform hover:scale-105">
              Join Our Mission
            </button>
            <button className="border border-sage-200 bg-white hover:bg-sage-50 text-sage-800 font-semibold rounded-full px-8 py-3 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-sage-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute top-24 -left-12 w-48 h-48 bg-sage-200 rounded-full opacity-30 blur-3xl"></div>
    </section>
  );
};

export default Hero;
