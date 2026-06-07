import BeloPreview from '../components/BeloPreview'

export default function BeloPreviewPage() {
  return <BeloPreview onClose={() => { window.location.href = '/' }} />
}
