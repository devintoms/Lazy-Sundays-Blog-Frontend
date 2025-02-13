"use client"
import Link from 'next/link';

export default function LinkButton({
    as: Component = "div",
    href, 
    ariaLabel = 'hyperlink', 
    children, 
    className = ``, 
    disabled = false,
    round = false,
    useAltColorScheme = false,
}) {

    return (
        <Component
            className={
                `${className}
                relative group w-fit p-4 m-auto font-semibold text-center text-lg
                ${useAltColorScheme ? `bg-bgsecondary border border-bgsecondary` : `bg-accentprimary border border-accentprimary font-semibold text-lg text-bgprimary`}
                ${round ? `rounded-full` : `rounded-md`} 
                ${disabled && `opacity-30`}
                ${!disabled && `transition-transform ease-in delay-100 hover:ease-out group-hover:delay-200 hover:-translate-x-1 hover:-translate-y-1`}`
            }
            aria-label={ariaLabel || href}
            disabled={disabled}
        >
            <span className={!disabled && `group-hover:transition-none group-hover:invisible transition-[visibility] delay-200 ease-linear`}>
                {children}
            </span>
            { !disabled && 
                <>
                    <div aria-hidden
                        className={`-z-10 absolute w-full h-full p-4 bg-accentprimary ${round ? `rounded-full` : `rounded-md`} top-0 left-0 ${useAltColorScheme && `text-bgprimary`}`}>
                            {/* "shadow" text allows smooth transition of color between all possible states */}
                            {children}
                    </div>
                    <div aria-hidden
                        className={`-z-20 absolute w-full h-full p-4 bg-accentsecondary ${round ? `rounded-full` : `rounded-md`} top-0 left-0
                            transition ease-in delay-150 group-hover:transition group-hover:ease-out group-hover:delay-150
                            group-hover:translate-x-0.5 group-hover:translate-y-0.5`}
                    />
                    <div aria-hidden
                        className={`-z-30 absolute w-full h-full p-4 bg-accenttertiary ${round ? `rounded-full` : `rounded-md`} top-0 left-0
                            transition ease-in delay-200 group-hover:transition group-hover:ease-out group-hover:delay-100
                            group-hover:translate-x-1 group-hover:translate-y-1`}
                    />
                </>
            }
            <Link href={href} aria-label={`go to ${href}`}>
                <span className="absolute inset-0" aria-hidden/>
            </Link>
        </Component>
    );
}