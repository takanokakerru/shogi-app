import moveSound from '../assets/move.mp3';

export function playMoveSound() {
  const audio = new Audio(moveSound);
  audio.play().catch(err => console.log('音を再生できません', err));
}
