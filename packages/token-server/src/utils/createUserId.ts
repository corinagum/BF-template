import random from 'math-random';

export default function createUserId(): string {
  return `dl_${random().toString(36).substr(2)}`;
}
