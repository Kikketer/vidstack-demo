import * as Slider from "@radix-ui/react-slider";
import { UseTrimSlider } from "./useTrimSlider";
import "./TrimSlider.css";

/**
 * Slider POC for trimming a video:
 * https://www.radix-ui.com/primitives/docs/components/slider
 */
export const TrimSlider: React.FC<{
  max: ReturnType<UseTrimSlider>["maxLength"];
  trimStart: ReturnType<UseTrimSlider>["trimStart"];
  trimEnd: ReturnType<UseTrimSlider>["trimEnd"];
  onSetTrim: ReturnType<UseTrimSlider>["onSetTrim"];
  onStartClick: () => void;
  onEndClick: () => void;
}> = ({ max, trimStart, trimEnd, onSetTrim, onStartClick, onEndClick }) => {
  return (
    <Slider.Root
      className="SliderRoot"
      value={[trimStart, trimEnd]}
      minStepsBetweenThumbs={1}
      step={0.03}
      min={0}
      max={max}
      onValueChange={onSetTrim}
    >
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb
        className="SliderThumb"
        aria-label="Start"
        onClick={() => onStartClick()}
      />
      <Slider.Thumb
        className="SliderThumb"
        aria-label="End"
        onClick={() => onEndClick()}
      />
    </Slider.Root>
  );
};
