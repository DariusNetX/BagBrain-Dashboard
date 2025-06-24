import baghead from '../assets/baghead.png';

export default function Hero() {
  return (
    <div className="bg-gradient-to-b from-black via-zinc-900 to-neutral-950 text-center py-12 px-6 text-white">
      <img
        src={baghead}
        alt="BagHead Mascot"
        className="mx-auto w-28 md:w-36 mb-4 drop-shadow-xl"
      />
      <h1 className="text-4xl md:text-6xl font-display text-bagbrain-accent drop-shadow-lg">
        I Have Bags for Brains 🧠💰
      </h1>
      <p className="mt-4 text-lg text-zinc-300 font-body">
        Stake. Withdraw. Meme. Repeat. <br /> The cult of BagBrain has begun.
      </p>
    </div>
  );
}