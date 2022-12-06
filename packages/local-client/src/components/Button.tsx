

const classNames = require('classnames');

enum BgColor {
  ORANGE = 1,
  SLATE,
  TRANSPARENT
}

enum Size {
  SMALL = 1,
  LARGE
}

enum Pill {
  SMALL = 1,
  LARGE,
  FULL
}

enum Hover {
  GROUP_FADE_IN = 1
}

const SIZE_MAPS: Record<Size, string> = {
  [Size.SMALL]: 'px-2.5 text-sm',
  [Size.LARGE]: 'px-3 text-xl',
}

const BG_COLOR_MAPS: Record<BgColor, string> = {
  [BgColor.ORANGE]: 'bg-orange-500 text-white',
  [BgColor.SLATE]: 'bg-slate-700 text-white',
  [BgColor.TRANSPARENT]: 'bg-transparent',
}

const PILL_MAPS: Record<Pill, string> = {
  [Pill.SMALL]: 'rounded-sm',
  [Pill.LARGE]: 'rounded-lg',
  [Pill.FULL]: 'rounded-full',
}

const HOVER_MAPS: Record<Hover, string> = {
  [Hover.GROUP_FADE_IN]: 'opacity-0 group-hover:opacity-100 transition-all ease-in-out',
}


export interface ButtonProps extends React.PropsWithChildren<React.ComponentPropsWithoutRef<'button'>> {
  bgColor: BgColor;
  size: Size;
  pill?: Pill;
  hover?: Hover;
}


const Button: React.FC<ButtonProps> = ({bgColor, size, pill, hover, children, ...rest}) => {


  return (
    <button 
      {...rest}
      className={classNames(
        `font-semibold p-2`, 
        BG_COLOR_MAPS[bgColor],
        SIZE_MAPS[size],
        pill && PILL_MAPS[pill],
        hover && HOVER_MAPS[hover]
      )}
    >   
      {children}
    </button>
  )
}

Button.defaultProps = {
  bgColor: BgColor.ORANGE,
  size: Size.SMALL,
};


export { Button, Size, BgColor, Pill, Hover }

