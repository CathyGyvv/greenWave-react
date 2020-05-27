import { observable, computed, action, useStrict } from 'mobx'

useStrict(true)

class List {
    @observable areaList

    @computed get filter () {

    }

    @action changeFilter = (type, name, value) => {

    }
}

const list = new List()

export default list
