import { mapActions } from 'vuex'

const workerTdmotionStore = 'workerTdmotionStore'

export const tdMotionMixin = {
    data: () => ({
        workerTdmotionList: [],
    }),    

    methods: {
        ...mapActions(workerTdmotionStore, [
            'AC_WORKER_TDMOTION_LIST'
        ]),
    
        tdmotionWorker(workerId, motionId) {
            this.workerTdmotionList = this.GE_WORKER_TDMOTION_LIST
            this.initTdmotionWoker(workerId, motionId)
            this.workerTdmotionList.push({worker_id: workerId, motion_id: motionId})
            this.AC_WORKER_TDMOTION_LIST(this.workerTdmotionList)  
            this.workerTdmotionList = []
            //console.log('this.GE_WORKER_TDMOTION_LIST : ' + JSON.stringify(this.GE_WORKER_TDMOTION_LIST,null,2))
      
        },
        initTdmotionWoker(workerId, motionId) {
            this.workerTdmotionList = this.workerTdmotionList.filter(f=> {
                                if((f.motion_id !== motionId && f.worker_id !== workerId) 
                                || (f.motion_id !== motionId && f.worker_id === workerId)
                                || (f.motion_id === motionId && f.worker_id !== workerId)){  
                                    return true
                                }
                                return false
                                }) 
        
            //console.log('this.workerTdmotionList init: ' + JSON.stringify(this.workerTdmotionList,null,2))
        },
    },    
}