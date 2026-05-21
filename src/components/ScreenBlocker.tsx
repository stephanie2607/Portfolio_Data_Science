'use client';

export const ScreenBlocker = () => {
  return (
    <>
      {/* Overlay visible uniquement sur mobile/tablette (< 1024px) */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 max-[1023px]:flex hidden">
        <div className="max-w-md w-full text-center">
          {/* Icône SVG d'ordinateur */}
          <div className="mb-6 flex justify-center">
            <svg
              className="w-24 h-24 text-white opacity-80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.75 17L9 20m0 0l-.75 3M9 20h6m-6 0l.75 3M15 17l.75 3m0 0l.75-3M4 12a8 8 0 018-8m0 0a8 8 0 018 8m0 0v5.5A2.5 2.5 0 0 1 19.5 22h-15A2.5 2.5 0 0 1 2 19.5V12m16 0H2"
              />
            </svg>
          </div>

          {/* Message textuel */}
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Écran trop petit
          </h1>
          <p className="text-lg text-gray-200 leading-relaxed">
            Cette application est optimisée pour grand écran. Veuillez agrandir
            votre fenêtre ou passer sur un ordinateur.
          </p>

          {/* Élément décoratif */}
          <div className="mt-8 flex gap-2 justify-center">
            <div className="w-2 h-2 bg-white/40 rounded-full" />
            <div className="w-2 h-2 bg-white/60 rounded-full" />
            <div className="w-2 h-2 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
};
