import { useEffect, useRef, useState } from "preact/hooks";

const useHeadingObserver = () => {
  //Take the heading ref and keep a ref of all elements
  const headingsRef = useRef<Element[]>();

  //Keep info about the scroll and how we change the current in view based on it
  const scrollRef = useRef(0);
  //The active id (or slug) that we are scrolled in via headings
  const [active, setActive] = useState(""); //active

  //The effect from react (but we are using preact but same idea)
  useEffect(() => {
    //Get the array of possible headings, that have an id
    const headings = Array.from(
      document.querySelectorAll("h2[id], h3[id], h4[id]")
    );
    //Get an array of ids from said headings
    const ids = headings.map((e) => e.id);
    headingsRef.current = headings; //Now set the ref to the list of headings

    //Create the observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          //Get the id of the current target we are looping
          const id = entry.target.getAttribute("id") ?? "";
          //If said target is intersecting, then its the current active heading
          if (entry.isIntersecting) {
            setActive(id);
            scrollRef.current = window.scrollY;
            //Return so this observable will end gracefully
            return;
          }
          //Grab the difference in the current scroll from where the window is scrolling
          const diff = scrollRef.current - window.scrollY;
          //Are we scrolling up?
          const isScrollingUp = diff > 0;

          //Current index of the ids
          const currentIndex = ids.indexOf(id);

          //Get the previous entry because the ids are indexed differently than expected
          const prevEntry = ids[currentIndex - 1];
          //If wea re scrolling, set the active id to said id
          if (isScrollingUp) {
            const id = prevEntry;
            setActive(id);
          }
        });
      },
      //Some configuration for the observable. Threshold is still confusing
      {
        rootMargin: "0% 0% -85% 0%",
        threshold: 0.1,
      }
    );
    //Observe each heading
    headings.forEach((e) => observer.observe(e));
  }, []);
  return active;
};

export default useHeadingObserver;
