export default function Brand() {
  return (
    <a
      href="/"
      aria-label="Bazan & Co. - Inicio"
      className="inline-flex items-center gap-3.5"
    >
      <span
        aria-hidden="true"
        className="relative grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[13px] border-2 border-[#D9B45A] sm:h-11 sm:w-11 sm:rounded-[15px]"
      >
        <span className="-translate-x-[3px] -translate-y-px font-serif text-[29px] leading-none text-[#F4F1EA] sm:text-[34px]">
          B
        </span>
        <span className="absolute bottom-1 right-1 font-serif text-base italic leading-none text-[#D9B45A] sm:bottom-[5px] sm:right-1.5 sm:text-[19px]">
          &amp;
        </span>
      </span>
      <span className="font-serif text-[22px] tracking-[-0.03em] text-[#F4F1EA] sm:text-[26px]">
        Bazan <em className="italic text-[#D9B45A]">&amp; Co.</em>
      </span>
    </a>
  );
}
