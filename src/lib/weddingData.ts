export type HeroSlide = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "OUR FOREVER",
    subtitle: "A night where two stories become one.",
    description:
      "Gather in velvet light and cinematic whispers as we celebrate the moment that begins our shared forever.",
    image:
      "/weddingImages/img2.jpg",
  },
  {
    id: 2,
    title: "TIME TO CELEBRATE",
    subtitle: "An intimate evening of warmth and wonder.",
    description:
      "Expect elegant details, soft candle glow, and the kind of atmosphere that feels like a memory already.",
    image:
      "/weddingImages/rhamely-8eDuPKLpFQE.jpg",
  },
  {
    id: 3,
    title: "DREAM IN CHAMPAGNE",
    subtitle: "A refined celebration beneath the stars.",
    description:
      "Slip into an evening filled with music, movement, and the unmistakable pulse of a night made just for us.",
    image:
      "/weddingImages/engin-akyurt-3IN8pjVpDw0-unsplash.jpg",
  },
];

export type GalleryItem = {
  id: number;
  title: string;
  image: string;
};

export const journeyMoments: GalleryItem[] = [
  {
    id: 1,
    title: "The Meeting",
    image:
      "/events/img1.jpg",
  },
  {
    id: 2,
    title: "First Dance",
    image:
      "/events/img2.jpg",
  },
  {
    id: 3,
    title: "The Proposal",
    image:
      "weddingImages/erik-gazi-pC5oyrgWbdo-unsplash.jpg",
  },
  {
    id: 4,
    title: "Under the Lights",
    image:
      "/events/img3.jpg",
  },
];

export const storyVideos: GalleryItem[] = [
  {
    id: 1,
    title: "Our Love Story",
    image:
      "/weddingImages/homeVideo/img2.jpg",
  },
  {
    id: 2,
    title: "Moonlit Promises",
    image:
      "/weddingImages/homeVideo/img3.jpg",
  },
  {
    id: 3,
    title: "A Golden Evening",
    image:
      "/weddingImages/homeVideo/img4.jpg",
  },
  {
    id: 4,
    title: "Midnight Toast",
    image:
      "/weddingImages/homeVideo/img5.jpg",
  },
];

export type Testimonial = {
  id: number;
  clientName: string;
  eventType: "Wedding" | "Event" | "Party" | "Celebration";
  rating: number;
  feedback: string;
  image: string;
  date: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    clientName: "Sarah & James",
    eventType: "Wedding",
    rating: 5,
    feedback: "Absolutely magical! They transformed our vision into reality. Every detail was perfect, and we couldn't have asked for a better team.",
    image: "/weddingImages/img2.jpg",
    date: "June 2025",
  },
  {
    id: 2,
    clientName: "Emily & Michael",
    eventType: "Wedding",
    rating: 5,
    feedback: "Professional, creative, and incredibly attentive. They handled everything seamlessly while we enjoyed our special day.",
    image: "/weddingImages/rhamely-8eDuPKLpFQE.jpg",
    date: "May 2025",
  },
  {
    id: 3,
    clientName: "The Johnson Family",
    eventType: "Event",
    rating: 4.5,
    feedback: "Outstanding event coordination! The decorations were stunning, and the flow of the evening was impeccable.",
    image: "/events/img1.jpg",
    date: "April 2025",
  },
  {
    id: 4,
    clientName: "Lisa & David",
    eventType: "Wedding",
    rating: 5,
    feedback: "They truly understood our aesthetic and executed it flawlessly. Our wedding was the most beautiful day of our lives!",
    image: "/weddingImages/engin-akyurt-3IN8pjVpDw0-unsplash.jpg",
    date: "March 2025",
  },
  {
    id: 5,
    clientName: "Amanda & Chris",
    eventType: "Party",
    rating: 4.5,
    feedback: "Amazing work on our anniversary celebration. The ambiance was perfect, and all our guests were impressed.",
    image: "/events/img2.jpg",
    date: "February 2025",
  },
  {
    id: 6,
    clientName: "Rachel & Tom",
    eventType: "Wedding",
    rating: 5,
    feedback: "From consultation to the last dance, they were exceptional. Highly recommend for anyone planning their dream wedding!",
    image: "/events/img3.jpg",
    date: "January 2025",
  },
];
