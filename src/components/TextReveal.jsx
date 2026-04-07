import React, { useRef, useEffect, useState } from 'react';

const TextReveal = ({ children, className = '', as: Tag = 'h2', stagger = 0.04, threshold = 0.3 }) => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    // Split text into words, preserving JSX children
    const renderContent = () => {
        if (typeof children === 'string') {
            const words = children.split(' ');
            return words.map((word, i) => (
                <span
                    key={i}
                    className="inline-block overflow-hidden mr-[0.25em]"
                >
                    <span
                        className="inline-block"
                        style={{
                            transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(110%) rotateX(-80deg)',
                            opacity: isVisible ? 1 : 0,
                            transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * stagger}s`,
                            transformOrigin: 'bottom center',
                        }}
                    >
                        {word}
                    </span>
                </span>
            ));
        }

        // Handle JSX children (keep React elements intact, split text nodes)
        let wordIndex = 0;
        return React.Children.map(children, (child) => {
            if (typeof child === 'string') {
                const words = child.split(' ').filter(w => w);
                return words.map((word) => {
                    const idx = wordIndex++;
                    return (
                        <span
                            key={`w-${idx}`}
                            className="inline-block overflow-hidden mr-[0.25em]"
                        >
                            <span
                                className="inline-block"
                                style={{
                                    transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(110%) rotateX(-80deg)',
                                    opacity: isVisible ? 1 : 0,
                                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${idx * stagger}s`,
                                    transformOrigin: 'bottom center',
                                }}
                            >
                                {word}
                            </span>
                        </span>
                    );
                });
            }

            // For React elements (like <span> with gradient text), wrap them with reveal animation
            if (React.isValidElement(child)) {
                const idx = wordIndex++;
                return (
                    <span
                        key={`e-${idx}`}
                        className="inline-block overflow-hidden"
                    >
                        <span
                            className="inline-block"
                            style={{
                                transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(110%) rotateX(-80deg)',
                                opacity: isVisible ? 1 : 0,
                                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${idx * stagger}s`,
                                transformOrigin: 'bottom center',
                            }}
                        >
                            {child}
                        </span>
                    </span>
                );
            }

            return child;
        });
    };

    return (
        <Tag ref={containerRef} className={`${className}`} style={{ perspective: '600px' }}>
            {renderContent()}
        </Tag>
    );
};

export default TextReveal;
