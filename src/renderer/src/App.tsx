import React, { useEffect } from 'react'
import { useApp } from './store/AppContext'
import Layout from './components/Layout/Layout'
import ActiveCases from './pages/ActiveCases/ActiveCases'
import ClosedCases from './pages/ClosedCases/ClosedCases'
import Templates from './pages/Templates/Templates'
import AdditionalTemplates from './pages/Templates/AdditionalTemplates'
import TemplateEditor from './pages/Templates/TemplateEditor'
import Settings from './pages/Settings/Settings'
import CaseWorkspace from './pages/CaseWorkspace/CaseWorkspace'
import DocumentEditor from './pages/CaseWorkspace/tabs/DocumentEditor'
import UpdateBanner from './modules/updater/UpdateBanner'

export default function App() {
  const { view, setView, updateCase, cases } = useApp()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      const isEditing = tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement).contentEditable === 'true'

      if (e.ctrlKey && e.key === 'n' && !isEditing) {
        e.preventDefault()
        setView({ type: 'active-cases' })
        document.dispatchEvent(new CustomEvent('new-case'))
      }

      // Only dispatch global save/export when NOT inside a rich-text editor.
      // DocumentEditor handles Ctrl+S / Ctrl+P in its own onKeyDown.
      if (e.ctrlKey && e.key === 's' && !isEditing) {
        e.preventDefault()
        document.dispatchEvent(new CustomEvent('save-doc'))
      }

      if (e.ctrlKey && e.key === 'p' && !isEditing) {
        e.preventDefault()
        document.dispatchEvent(new CustomEvent('export-jpeg'))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setView])

  const renderMain = () => {
    switch (view.type) {
      case 'active-cases':         return <ActiveCases />
      case 'closed-cases':         return <ClosedCases />
      case 'templates':            return <Templates />
      case 'additional-templates': return <AdditionalTemplates />
      case 'settings':             return <Settings />
      case 'case-workspace':       return <CaseWorkspace caseId={view.caseId} initialTab={view.tab} />
      case 'template-editor':      return <TemplateEditor docType={view.docType} from={view.from} onBack={() => setView({ type: view.from ?? 'templates' })} />
      case 'document-editor': {
        const c = cases.find(x => x.id === view.caseId)
        const doc = c?.documents.find(d => d.id === view.documentId)
        if (!c || !doc) return <ActiveCases />
        return (
          <DocumentEditor
            case_={c}
            document={doc}
            onSave={async (html) => {
              const updated = c.documents.map(d =>
                d.id === doc.id ? { ...d, content: html, updatedAt: new Date().toISOString() } : d
              )
              await updateCase(c.id, { documents: updated })
            }}
            onSaveWithVersions={async (html, versions) => {
              const updated = c.documents.map(d =>
                d.id === doc.id ? { ...d, content: html, versions, updatedAt: new Date().toISOString() } : d
              )
              await updateCase(c.id, { documents: updated })
            }}
            onSaveComments={async (comments) => {
              const updated = c.documents.map(d =>
                d.id === doc.id ? { ...d, comments } : d
              )
              await updateCase(c.id, { documents: updated })
            }}
            onBack={() => setView({ type: 'case-workspace', caseId: view.caseId, tab: 'documents' })}
          />
        )
      }
    }
  }

  return (
    <>
      <Layout>{renderMain()}</Layout>
      <UpdateBanner />
    </>
  )
}
