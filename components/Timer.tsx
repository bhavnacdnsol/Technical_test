import { addSeconds, startOfDay, differenceInMilliseconds, differenceInSeconds } from 'date-fns';
import { format, zonedTimeToUtc } from 'date-fns-tz';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Room } from '../types/app';
import { useUser } from '../data/auth';
import { useRoom } from '../data/room';
import { theme } from 'twin.macro';
import { useState, useEffect } from 'react';
import { usePrevious } from '../utils/hooks';
import { ShowFor } from './Elements';

const DEFAULT_TIMER_SECONDS = 90

export function Timer ({ room: _room }: { room: Room }) {
  const [timerFinishedDate, setTimerFinishedDate] = useState<Date | null>(null)
  const [user, isLoggedIn, profile] = useUser()
  const [room, updateRoom] = useRoom(_room.slug, _room)
  const isPlaying = room.timerState === 'playing'

  const previousTimerState = usePrevious(room.timerState)
  useEffect(() => {
    if (previousTimerState === 'playing' && room.timerState !== 'playing') {
      setTimerFinishedDate(new Date())
    }
  }, [room.timerState, previousTimerState])

  const toggleTimer = () => {
    if (isPlaying) {
      resetTimer()
    } else {
      startTimer()
    }
  }

  const resetTimer = () => {
    updateRoom({
      timerState: 'stopped',
      timerStartTime: zonedTimeToUtc(new Date() as any, 'UTC') as any,
    })
  }

  const startTimer = (timerDuration?: number) => updateRoom({
    timerState: 'playing',
    timerStartTime: zonedTimeToUtc(new Date() as any, 'UTC') as any,
    timerDuration
  })

  const startDate = new Date(room.timerStartTime)
  const now = new Date()
  const endDate = addSeconds(startDate, room.timerDuration)
  const remainingSeconds = Math.abs(differenceInMilliseconds(
    now,
    endDate,
  ) / 1000)

  function onTimerComplete () {
    resetTimer()
  }

  function sd (seconds: number, duration: number) {
    return seconds / duration
  }

  return (
    <>
      <CountdownCircleTimer
        key={JSON.stringify([room.timerState, room.timerStartTime, room.timerDuration])}
        isPlaying={isPlaying}
        initialRemainingTime={isPlaying ? remainingSeconds : room.timerDuration}
        duration={room.timerDuration}
        colors={[
          [theme`colors.adhdDarkPurple`, sd(0.5, room.timerDuration)],
          [theme`colors.adhdBlue`, sd(room.timerDuration - 11, room.timerDuration)],
          [theme`colors.adhdBlue`, sd(0.5, room.timerDuration)],
          // 10 second countdown
          [theme`colors.red.600`, sd(0.5, room.timerDuration)],
          ['#FFFFFF', sd(0.5, room.timerDuration)],
          [theme`colors.red.600`, sd(0.5, room.timerDuration)],
          ['#FFFFFF', sd(0.5, room.timerDuration)],
          [theme`colors.red.600`, sd(0.5, room.timerDuration)],
          ['#FFFFFF', sd(0.5, room.timerDuration)],
          [theme`colors.red.600`, sd(0.5, room.timerDuration)],
          ['#FFFFFF', sd(0.5, room.timerDuration)],
          [theme`colors.red.600`, sd(0.5, room.timerDuration)],
          ['#FFFFFF', sd(0.5, room.timerDuration)],
          [theme`colors.red.600`, sd(0.5, room.timerDuration)],
          ['#FFFFFF', sd(0.5, room.timerDuration)],
          [theme`colors.red.600`, sd(0.5, room.timerDuration)],
          ['#FFFFFF', sd(0.5, room.timerDuration)],
          [theme`colors.red.600`, sd(0.5, room.timerDuration)],
          ['#FFFFFF', sd(0.5, room.timerDuration)],
          [theme`colors.red.600`, sd(0.5, room.timerDuration)],
          ['#FFFFFF', sd(0.5, room.timerDuration)],
          [theme`colors.red.600`, sd(0.5, room.timerDuration)],
          ['#FFFFFF', sd(0.5, room.timerDuration)],
        ]}
        trailColor={theme`colors.adhdDarkPurple`}
        onComplete={onTimerComplete}
        strokeWidth={20}
      >
        {({ remainingTime, elapsedTime }) => <span className='text-center'>
          {!!remainingTime && !!elapsedTime ? (
            <div className='text-4xl'>
              {format(
                addSeconds(
                  startOfDay(new Date()),
                  remainingTime
                ),
                'm:ss'
              )}
            </div>
          ) :
          !profile?.canLeadSessions && timerFinishedDate ? (
            <ShowFor seconds={5}>
              <div className='uppercase text-sm font-semibold mt-2 cursor-pointer text-adhdBlue bg-adhdDarkPurple rounded-lg p-1' onClick={toggleTimer}>
                Time Is Up! ✅
              </div>
            </ShowFor>
          ) : null}
          {profile?.canLeadSessions && (
          <>  
              {isPlaying && (
                <div className='uppercase text-sm font-semibold mt-2 cursor-pointer text-adhdBlue hover:text-red-600 bg-adhdDarkPurple rounded-lg p-1' onClick={toggleTimer}>
                  Stop early
                </div>
              )}
              {!isPlaying && (
                <div className='space-y-1'>
                {[
                  { duration: 60, label: '1 min', className: 'text-xs text-opacity-80' },
                  { duration: 90, label: '1:30', className: 'text-base font-bold' },
                  { duration: 30, label: '30 secs', className: 'text-xs text-opacity-80' }
                ].map(({ duration, label, className }) => (
                  <div key={label} onClick={() => startTimer(duration)} className={`${className} uppercase font-semibold cursor-pointer text-adhdBlue hover:text-red-600 bg-adhdDarkPurple rounded-lg p-1`}>
                    {label}
                  </div>
                ))}
                </div>
              )}
            </>
          )}
        </span>}
      </CountdownCircleTimer>
    </>
  )
}