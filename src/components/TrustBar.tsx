import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const TrustBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-16 border-y border-border/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8">
            Trusted by forward-thinking brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40">
            {['ACME', 'VERTEX', 'AXIOM', 'NEXUS', 'PRISM'].map((brand, i) => (
              <motion.span
                key={brand}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className="text-lg md:text-xl font-display font-bold tracking-wider"
              >
                {brand}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBar;
