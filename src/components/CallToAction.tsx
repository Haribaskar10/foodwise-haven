
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section id="cta" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-sage-600 to-sage-700 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-8 py-16 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white opacity-0 animate-fade-in">
              Join Our Community of Food Waste Fighters
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8 opacity-0 animate-fade-in animate-delay-100">
              Be part of the solution. Start managing your food better today and
              join thousands of others making a positive impact on the planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in animate-delay-200">
              <Link to="/signup" className="bg-white text-sage-800 font-semibold rounded-full px-8 py-3 transition-all duration-300 hover:bg-sage-50 hover:shadow-lg inline-block">
                Get Started — It's Free
              </Link>
              <Link to="/login" className="border border-white/30 text-white font-semibold rounded-full px-8 py-3 transition-all duration-300 hover:bg-white/10 inline-block">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-sage-50 opacity-50 -z-10"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-sage-200 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-sage-300 rounded-full opacity-20 blur-3xl -z-10"></div>
    </section>
  );
};

export default CallToAction;
