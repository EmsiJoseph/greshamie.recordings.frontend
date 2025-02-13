import AudioPlayer from "./audio-player";
export default function Page() {
  return (
    <div>
      <h1>Audio Player Prop for Testing Purposes</h1>
      <AudioPlayer url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" playing={false} onPlayPause={function (): void {
        throw new Error("");
      } } onClose={function (): void {
        throw new Error("");
      } } />
    </div>
  );
}
