document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".counter");

    const startCounting = () => {
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute("data-target")); // Get target number
            let count = parseFloat(counter.getAttribute("data-start")) || 0; // Start from custom value

            const updateCount = () => {
                let increment = (target - count) / 30; // Adjust speed

                if (count < target) {
                    count += increment;
                    counter.innerText = 
                        (count >= target ? target : count.toFixed(target % 1 === 0 ? 0 : 1)) + 
                        (target >= 1 ? "M" : "M+");

                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target + (target >= 1 ? "M" : "M+");
                }
            };

            updateCount();
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting();
                observer.disconnect(); // Ensures it runs only once
            }
        });
    }, { threshold: 1 });

    observer.observe(document.querySelector(".counters"));
});
