import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
const rootElement = document.getElementById('root')
if (rootElement === null) throw new Error('Failed to find the root element')
const root = createRoot(rootElement)
root.render(
    <App />
)

reportWebVitals()
