import { observable, computed, action, useStrict } from 'mobx'

useStrict(true)

class Detail {
    @observable areaList

    @computed get filter () {

    }

    @action changeFilter = (type, name, value) => {

    }
}

const detail = new Detail()

export default detail
