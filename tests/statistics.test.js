import assert from 'node:assert/strict';
import test from 'node:test';
import { statistics } from '../backend/server.js';

function makeState(votes) {
  return {
    settings: { expectedVoters: 0 },
    positions: [{ id: 'president', name: 'President', candidates: ['A', 'B'] }],
    votes: votes.map(({ candidate, submittedAt }) => ({
      choices: [candidate],
      submittedAt
    }))
  };
}

test('earliest supporting ballot wins a vote-count tie', () => {
  const result = statistics(makeState([
    { candidate: 'B', submittedAt: '2026-01-01T10:00:00.000Z' },
    { candidate: 'A', submittedAt: '2026-01-01T10:01:00.000Z' },
    { candidate: 'A', submittedAt: '2026-01-01T10:02:00.000Z' },
    { candidate: 'B', submittedAt: '2026-01-01T10:03:00.000Z' }
  ])).results[0];

  assert.deepEqual(result.winners, ['B']);
  assert.equal(result.tieBroken, true);
  assert.equal(result.winningVotes, 2);
});

test('stored ballot order breaks identical timestamps', () => {
  const result = statistics(makeState([
    { candidate: 'A', submittedAt: '2026-01-01T10:00:00.000Z' },
    { candidate: 'B', submittedAt: '2026-01-01T10:00:00.000Z' },
    { candidate: 'B', submittedAt: '2026-01-01T10:01:00.000Z' },
    { candidate: 'A', submittedAt: '2026-01-01T10:02:00.000Z' }
  ])).results[0];

  assert.deepEqual(result.winners, ['A']);
  assert.equal(result.tieBroken, true);
});

test('vote-count leader remains winner without a tie-break', () => {
  const result = statistics(makeState([
    { candidate: 'A', submittedAt: '2026-01-01T10:00:00.000Z' },
    { candidate: 'B', submittedAt: '2026-01-01T10:01:00.000Z' },
    { candidate: 'A', submittedAt: '2026-01-01T10:02:00.000Z' }
  ])).results[0];

  assert.deepEqual(result.winners, ['A']);
  assert.equal(result.tieBroken, false);
});
