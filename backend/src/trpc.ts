import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { Chess } from 'chess.js';

const t = initTRPC.create();

const moveSchema = z.object({
  from: z.string().length(2),
  to: z.string().length(2),
  promotion: z.enum(['q', 'r', 'b', 'n']).optional(),
});

export const appRouter = t.router({
  health: t.procedure.query(() => ({
    status: 'ok' as const,
    uptime: process.uptime(),
  })),

  validateMove: t.procedure
    .input(
      z.object({
        fen: z.string().min(1),
        move: moveSchema,
      })
    )
    .mutation(({ input }) => {
      let board: Chess;
      try {
        board = new Chess(input.fen);
      } catch {
        return { legal: false as const, reason: 'invalid_fen' as const };
      }

      try {
        const result = board.move(input.move);
        return {
          legal: true as const,
          move: { from: result.from, to: result.to },
          fen: board.fen(),
        };
      } catch {
        return { legal: false as const, reason: 'illegal_move' as const };
      }
    }),
});

export type AppRouter = typeof appRouter;
