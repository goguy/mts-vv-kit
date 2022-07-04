<template>    
    <component v-bind:is="defineComponentInstance" />
</template>

<script>
import { mapGetters } from 'vuex'
import Enumerable  from 'linq'

const codeStore = 'codeStore'
const workStore = 'workStore'
const workerStore = 'workerStore'

export default {
    name: 'Reporting',
    data: () => ({ }),
    computed: {
        ...mapGetters(codeStore, [
            'GE_CODE_LIST'
        ]),    
        ...mapGetters(workStore, [
            'GE_WORK_LIST'
        ]),    
        ...mapGetters(workerStore, [
            'GE_WORKER'
        ]),    

        defineComponentInstance () {
            let query = Enumerable.from(this.GE_WORK_LIST)
                                  .where(w=>w.work_id === this.GE_WORKER.work_id)
                                  .join(Enumerable.from(this.GE_CODE_LIST)
                                        .where(w=>w.group_code_id === (this.GE_CODE_LIST.filter(f=>f.code=='outbreak_group')[0].code_id )),            
                                    pk=>pk.type,
                                    fk=>fk.code,
                                    (left, right) =>({...left, ...right})
                                  ).first()
            
            //console.log('query', JSON.stringify(query, null, 2))
            
            const componentName = query.attr2
            return () => import(`./report/${componentName}`)
        }
    },    
}
</script>

<style>
</style>