import { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

export const IntegrationContext = createContext(null)

export function IntegrationProvider({ children }) {
  const value = {
    currency: 'GEL',
    platformName: 'React E-Commerce Platform',
  }

  return (
    <IntegrationContext.Provider value={value}>
      {children}
    </IntegrationContext.Provider>
  )
}

IntegrationProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useIntegrationContext() {
  const context = useContext(IntegrationContext)

  if (!context) {
    throw new Error('useIntegrationContext must be used inside IntegrationProvider')
  }

  return context
}
