import { FadeLoader } from 'react-spinners';
import colors from 'tailwindcss/colors';

interface LoaderProps {
  tintedBackground?: boolean;
  small?: boolean;
}

export default function Loader({
  small = false,
  tintedBackground = false,
}: LoaderProps) {
  if (small) return <FadeLoader color={colors.slate[900]} />;

  return (
    <div
      className={`z-10 h-full w-full fixed ${
        tintedBackground ? 'bg-slate-700/50' : ''
      }`}
    >
      <div className="top-1/2 left-1/2 fixed">
        <FadeLoader color={colors.slate[900]} />
      </div>
    </div>
  );
}
