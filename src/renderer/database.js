import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

export default new Datastore({
  autoload: true,
  timestampData: true,
  filename: path.join(remote.app.getPath('userData'), '/data.db')
})
