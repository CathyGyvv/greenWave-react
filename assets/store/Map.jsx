import { observable, computed, action, useStrict } from 'mobx'

useStrict(true)

class Map {
    @observable areaList

    @computed get filter () {

    }

    @action changeFilter = (type, name, value) => {

    }
}

const map = new Map()

export default map
