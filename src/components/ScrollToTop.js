import upIcon from "../../public/images/icon/up.svg";
import Image from "next/image";

export default function ScrollToTop() {
  function scrollTo(to, duration = 700) {
    const element = document.scrollingElement || document.documentElement,
      start = element.scrollTop,
      change = to - start,
      startDate = +new Date(),
      easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      },
      animateScroll = function () {
        const currentDate = +new Date();
        const currentTime = currentDate - startDate;
        element.scrollTop = parseInt(
          easeInOutQuad(currentTime, start, change, duration)
        );
        if (currentTime < duration) {
          requestAnimationFrame(animateScroll);
        } else {
          element.scrollTop = to;
        }
      };
    animateScroll();
  }

  return (
    <button
      style={{
        position: "fixed",
        bottom: "50px",
        right: "15px",
        zIndex: "899",
      }}
      onClick={() => scrollTo(0)}
    >
      <Image width="30" height="30" src={upIcon} alt="" />
    </button>
  );
}
