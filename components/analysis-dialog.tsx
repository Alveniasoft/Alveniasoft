"use client"
import { PlayerAnalysis } from "./player-analysis"
import { TeamAnalysis } from "./team-analysis"

export type AnalysisType = "player" | "team"

interface AnalysisDialogProps {
  type: AnalysisType
  id?: string
  isOpen: boolean
  onClose: () => void
}

export function AnalysisDialog({ type, id, isOpen, onClose }: AnalysisDialogProps) {
  if (type === "player") {
    return <PlayerAnalysis playerId={id} isOpen={isOpen} onClose={onClose} />
  } else {
    return <TeamAnalysis teamId={id} isOpen={isOpen} onClose={onClose} />
  }
}
