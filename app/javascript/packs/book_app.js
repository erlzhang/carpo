import Rails from 'rails-ujs'

import BookConfigPanel from 'components/BookConfigPanel.js'
import BookVolumesPanel from 'components/BookVolumesPanel.js'

Rails.start()

const bookConfigPanel = new BookConfigPanel()
const volumesPanel = new BookVolumesPanel()
