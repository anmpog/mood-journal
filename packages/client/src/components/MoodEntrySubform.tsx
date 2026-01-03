import { moodRatingScale } from '@/scales/moodRatingScale'
import { sleepDurationScale } from '@/scales/sleepDurationScale'
import { sleepQualityScale } from '@/scales/sleepQualityScale'
import { stressRatingScale } from '@/scales/stressRatingScale'
import SelectField from './form/SelectField'

export const MoodEntrySubform = () => {
  return (
    <>
      <SelectField
        name='moodRating'
        label='Mood Rating'
        placeholderText='Select a Mood Rating'
        optionsArr={moodRatingScale}
      />
      <SelectField
        name='stressRating'
        label='Stress Rating'
        placeholderText='Select a Stress Rating'
        optionsArr={stressRatingScale}
      />
      <SelectField
        name='sleepDuration'
        label='Sleep Duration'
        placeholderText='Select a Sleep Duration'
        optionsArr={sleepDurationScale}
      />
      <SelectField
        name='sleepQuality'
        label='Sleep Quality'
        placeholderText='Select a Sleep Quality'
        optionsArr={sleepQualityScale}
      />
    </>
  )
}
