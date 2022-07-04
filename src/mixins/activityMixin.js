import { mapGetters, mapActions } from 'vuex'
import Enumerable  from 'linq'

const workerStore = 'workerStore'

//Commmon Activity
const activityStore = 'activityStore'
const workerActivityStore = 'workerActivityStore'
const workerActivityHistoryStore = 'workerActivityHistoryStore'

export const activityMixin = {
    data: () => ({
    }),
    computed: {         
        ...mapGetters(activityStore, [
            'GE_ACTIVITY_LIST'
        ]),
        ...mapGetters(workerActivityStore, [
            'GE_WORKER_ACTIVITY_LIST'
        ]),

    },        
    methods: {
        ...mapActions(workerStore, [
            'AC_WORKER' 
        ]),    
        ...mapActions(workerActivityHistoryStore, [
            'AC_WORKER_ACTIVITY_HISTORY_PUSH'
        ]),
        ...mapActions(workerActivityStore, [
            'AC_WORKER_ACTIVITY_PUSH', 'AC_WORKER_ACTIVITY_LIST'
        ]),

        activityWorker(workerId, activityId) {
            let query = this.GE_WORKER_ACTIVITY_LIST.filter(f=>(f.worker_id===parseInt(workerId) && f.activity_id===parseInt(activityId)))
            //let query = this.GE_WORKER_ACTIVITY_LIST
            //console.log('activityWorker query', JSON.stringify(query,null,2))
            if(query.length < 1)
                this.AC_WORKER_ACTIVITY_PUSH({
                    worker_id:workerId,
                    activity_id:activityId
                })
            
            /*
            this.workerActivityList = this.GE_WORKER_ACTIVITY_LIST
            this.initActivityWoker(workerId, activityId)
            this.workerActivityList.push({worker_id: workerId, activity_id: activityId});
            this.AC_WORKER_ACTIVITY_LIST(this.workerActivityList);  
            this.workerActivityList = []
            //console.log('this.GE_WORKER_ACTIVITY_LIST ADD : ' + JSON.stringify(this.GE_WORKER_ACTIVITY_LIST,null,2))
            */
        },
        /*
        delActivityWorker(workerId, activityId){
            this.workerActivityList = this.GE_WORKER_ACTIVITY_LIST
            this.initActivityWoker(workerId, activityId)
            this.AC_WORKER_ACTIVITY_LIST(this.workerActivityList);  
            this.workerActivityList = []
            //console.log('this.GE_WORKER_ACTIVITY_LIST DEL : ' + JSON.stringify(this.GE_WORKER_ACTIVITY_LIST,null,2))
        },
        initActivityWoker(workerId, activityId) {
            this.workerActivityList = this.workerActivityList.filter(f=> {
                                if((f.activity_id !== activityId && f.worker_id !== workerId) 
                                || (f.activity_id !== activityId && f.worker_id === workerId)
                                || (f.activity_id === activityId && f.worker_id !== workerId)){  
                                    return true
                                }
                                return false
                                })
            //console.log('this.workerActivityList a: ' + JSON.stringify(this.workerActivityList,null,2))                             
        },
        */
        getActivityId(activity){
            let query = Enumerable.from(this.GE_ACTIVITY_LIST).where(w=>w.name === activity).toArray()
            //console.log('query getActivityId : ' + JSON.stringify(query,null,2));
            return query[0].activity_id
        },    
        historyActivityWorker(activityId, workerId, domain, domainId, type, state) {

            this.AC_WORKER_ACTIVITY_HISTORY_PUSH({
                worker_id: workerId,
                activity_id: activityId,
                domain: domain,
                domain_id: domainId,
                type: type,
                state: state,
                reg_dt: new Date(+new Date() + 3240 * 10000).toISOString().replace('T', ' ').replace(/\..*/, ''),
            })
            //console.log('this.GE_WORKER_ACTIVITY_HISTORY_LIST : ' + JSON.stringify(this.GE_WORKER_ACTIVITY_HISTORY_LIST,null,2))
        }    
    },    
}