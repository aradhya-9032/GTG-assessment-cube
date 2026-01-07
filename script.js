const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const slide = document.getElementById("slide");
const thumbnails = document.querySelectorAll(".images_group img");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dots = document.querySelectorAll(".dot");
const header = document.getElementById("Stickyheader");
const headers = document.querySelectorAll(".accordion-header");
const firstItem = document.querySelector(".accordion-item");


window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});


const images = [
  
  "images/perfume-b.png",
  "images/perfume-c.png",
  "images/perfume-d.png",
  "images/perfume-e.png",
  "images/perfume-a.png",
  "images/perfume-c.png",
  "images/perfume-d.png",
  "images/perfume-e.png",
 
];

let index = 0;



function updateSlider() {
  slide.src = images[index];

  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index % dots.length);
  });
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % images.length;
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + images.length) % images.length;
  updateSlider();
});

thumbnails.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    index = Number(thumb.dataset.index);
    updateSlider();
  });
});

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    index = Number(dot.dataset.index);
    updateSlider();
  });
});

updateSlider();


if (firstItem) {
  firstItem.classList.add("active");
  firstItem.querySelector(".accordion-content").style.maxHeight =
    firstItem.querySelector(".accordion-content").scrollHeight + "px";
  firstItem.querySelector(".icon").textContent = "−";
}

headers.forEach(header => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const content = header.nextElementSibling;
    const icon = header.querySelector(".icon");

    const isOpen = item.classList.contains("active");

    // close all
    document.querySelectorAll(".accordion-item").forEach(i => {
      i.classList.remove("active");
      i.querySelector(".accordion-content").style.maxHeight = null;
      i.querySelector(".icon").textContent = "+";
    });

    // open current
    if (!isOpen) {
      item.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
      icon.textContent = "−";
    }
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector("#stats");

  if (!statsSection) return;

  const counters = document.querySelectorAll(".counter");
  let counterStarted = false;

  const startCounter = () => {
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      let count = 0;
      const speed = 200;

      const updateCount = () => {
        const increment = target / speed;

        if (count < target) {
          count += increment;
          counter.textContent = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target;
        }
      };

      updateCount();
    });
  };

  const observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting && !counterStarted) {
        counterStarted = true;
        startCounter();
      }
    },
    { threshold: 0.4 }
  );

  observer.observe(statsSection);
});


const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // animate once
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  }
);

reveals.forEach(section => observer.observe(section));