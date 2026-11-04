import { transcribe } from 'ai'
import { readFileSync } from 'fs'

export async function GET(req: Request) {
  const model = new URL(req.url).searchParams.get('m') ?? 'elevenlabs/scribe-v2'
  try {
    const r = await transcribe({ model, audio: readFileSync('/tmp/v0-workspace/media/raw.mp4') })
    return Response.json({ text: r.text, n: r.segments.length, seg: r.segments.slice(0, 12), meta: JSON.stringify(r.providerMetadata ?? {}).slice(0, 2000), warnings: r.warnings })
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 })
  }
}
