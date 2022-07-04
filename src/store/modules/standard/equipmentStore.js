import standard from '@/js/initData/standard.js'

const EQUIPMENT_DATA = () => {
    return {
        classify: '',
        equipment_id: 0,
        img_nm: '',
        img_url: '',
        name: '',
        reg_dt: '',
        require: '',
        type: '',
        is_outbreak: 'N'
    }
} 


const equipmentStore ={
    namespaced: true,
    state: {
        equipment: EQUIPMENT_DATA(),
        equipmentList:standard.getEquipmentList()
        /*    
        equipmentList:[]
        equipmentList: [
            {
            equipment_id: 1,            
            name: '안전모', 
            type: 'protect',
            require: 'Y',
            classify: 'M',
            img_src: require('@/assets/img/safety_helmet.png'),
            disaster_id: 90
            },
            {
            equipment_id: 2, 
            name: '안전대', 
            type: 'protect',
            require: 'Y',
            classify: 'M',
            img_src: require('@/assets/img/safety_belt.png'),
            disaster_id: 90
            },
            {
            equipment_id: 3, 
            name: '안전화', 
            type: 'protect',
            require: 'Y',
            classify: 'M',
            img_src: require('@/assets/img/safety_boots.png'),
            disaster_id: 90
            },
            {
            equipment_id: 4, 
            name: '보안면',
            type: 'protect',  
            require: 'Y',
            classify: 'M', 
            img_src: require('@/assets/img/safety_face.png'),
            disaster_id: 90
            },
            {
            equipment_id: 5, 
            name: '보안경', 
            type: 'protect', 
            require: 'Y',
            classify: 'A',   
            img_src: require('@/assets/img/safety_glasses.png'),
            disaster_id: 11
            },
            {
            equipment_id: 6, 
            name: '보호복', 
            type: 'protect', 
            require: 'Y',
            classify: 'M',  
            img_src: require('@/assets/img/protective_clothing.png'),
            disaster_id: 90
            },
            {
            equipment_id: 7,
            name: '안전장갑', 
            type: 'protect',
            require: 'Y',
            classify: 'M', 
            img_src: require('@/assets/img/safety_gloves.png'),
            disaster_id: 90
            },
            {
            equipment_id: 8,
            name: '방진마스크', 
            type: 'protect',
            require: 'Y',
            classify: 'A', 
            img_src: require('@/assets/img/dust_mask.png'),
            disaster_id: 1
            },
            {
            equipment_id: 9,
            name: '방독마스크', 
            type: 'protect',
            require: 'Y',
            classify: 'A', 
            img_src: require('@/assets/img/proof_mask.png'),
            disaster_id: 1
            },
            {
            equipment_id: 10,
            name: '귀마개', 
            type: 'protect', 
            require: 'Y',
            classify: 'A', 
            img_src: require('@/assets/img/ear_plug.png'),
            disaster_id: 10
            },
            {
            equipment_id: 11, 
            name: '송기마스크', 
            type: 'protect',
            require: 'Y',
            classify: 'A', 
            img_src: require('@/assets/img/air_mask.png'),
            disaster_id: 1
            },
            {
            equipment_id: 12, 
            name: '산소농도측정기', 
            type: 'safety',
            require: 'Y',
            classify: 'A', 
            img_src: require('@/assets/img/oxygen_concentration_meter.png'),
            disaster_id: 1
            },
            {
            equipment_id: 13, 
            name: '소음측정기',
            type: 'safety',
            require: 'Y',
            classify: 'A', 
            img_src: require('@/assets/img/sound_level_meter.png'),
            disaster_id: 10
            },
            {
            equipment_id: 14, 
            name: '열선풍속측정기',
            type: 'safety',
            require: 'Y',
            classify: 'A', 
            img_src: require('@/assets/img/hot_wire_wind_speed_meter.png'),
            disaster_id: 9
            },
            {
            equipment_id: 15, 
            name: '송풍기', 
            type: 'safety', 
            require: 'Y',
            classify: 'A', 
            img_src: require('@/assets/img/exhaust_fan.png'),
            disaster_id: 1
            },
            {
            equipment_id: 16, 
            name: '배풍기',
            type: 'safety', 
            require: 'Y',
            classify: 'A', 
            img_src: require('@/assets/img/air_blower.png'),
            disaster_id: 1
            },
            {
            equipment_id: 17, 
            name: '방폭등', 
            type: 'safety', 
            require: 'Y',
            classify: 'M', 
            img_src: require('@/assets/img/explosion-proof_light.png'),
            disaster_id: 90
            },
            {
            equipment_id: 30, 
            name: '고압세척기', 
            type: 'work',
            require: '',
            classify: '', 
            img_src: require('@/assets/img/workerTool.png'),
            disaster_id: 0
            },
            {
            equipment_id: 31, 
            name: '슬러지제거기', 
            type: 'work',
            require: '',
            classify: '', 
            img_src: require('@/assets/img/workerTool.png'),
            disaster_id: 0
            },
            {
            equipment_id: 32, 
            name: '소독기', 
            type: 'work',
            require: '',
            classify: '', 
            img_src: require('@/assets/img/workerTool.png'),
            disaster_id: 0
            },
            {
            equipment_id: 33, 
            name: '진공펌프', 
            type: 'work',
            require: '',
            classify: '', 
            img_src: require('@/assets/img/workerTool.png'),
            disaster_id: 0
            },
            {
            equipment_id: 34, 
            name: '세정액',
            type: 'work',
            require: '',
            classify: '', 
            img_src: require('@/assets/img/workerTool.png'),
            disaster_id: 0
            },
            {
            equipment_id: 35, 
            name: '고압분무기',
            type: 'work',
            require: '',
            classify: '', 
            img_src: require('@/assets/img/workerTool.png'),
            disaster_id: 0
            },
            {
            equipment_id: 36, 
            name: '면걸레', 
            type: 'work',
            require: '',
            classify: '', 
            img_src: require('@/assets/img/workerTool.png'),
            disaster_id: 0
            },
            {
            equipment_id: 37, 
            name: '샌딩사', 
            type: 'work',
            require: '',
            classify: '', 
            img_src: require('@/assets/img/workerTool.png'),
            disaster_id: 0
            },
            {
            equipment_id: 38, 
            name: '샌드블러스터',
            type: 'work',
            require: '',
            classify: '', 
            img_src: require('@/assets/img/workerTool.png'),
            disaster_id: 0
            },
            {
            equipment_id: 39, 
            name: '비파괴검사기', 
            type: 'work',
            require: '',
            classify: '', 
            img_src: require('@/assets/img/workerTool.png'),
            disaster_id: 0 
            },
            {
            equipment_id: 40, 
            name: '용접기', 
            type: 'work',
            require: '',
            classify: '', 
            img_src: require('@/assets/img/workerTool.png'),
            disaster_id: 0
            },
            {
            equipment_id: 41, 
            name: '에어스프레이',
            type: 'work',
            require: '',
            classify: '', 
            img_src: require('@/assets/img/workerTool.png'),
            disaster_id: 0 
            },
            {
            equipment_id: 42, 
            name: '에어리스', 
            type: 'work',
            require: '',
            classify: '', 
            img_src: require('@/assets/img/workerTool.png'),
            disaster_id: 0
            },
            {
            equipment_id: 43, 
            name: '페인트', 
            type: 'work',
            require: '',
            classify: '', 
            img_src: require('@/assets/img/workerTool.png'),
            disaster_id: 0
            },
            {
            equipment_id: 44, 
            name: '온풍기', 
            type: 'work',
            require: '',
            classify: '', 
            img_src: require('@/assets/img/workerTool.png'),
            disaster_id: 0
            },
            {
            equipment_id: 45, 
            name: '도막측정기', 
            type: 'work',
            require: '',
            classify: '', 
            img_src: require('@/assets/img/workerTool.png'),
            disaster_id: 0
            }
        ]
        */        
    },
    mutations: {
        MU_EQUIPMENT: (state, payload) => {
            state.equipment = payload
        },
        MU_EQUIPMENT_PUSH: (state, payload) => {
            state.equipmentList.push(payload)
        }, 
        MU_EQUIPMENT_LIST: (state, payload) => {
            state.equipmentList = payload
        },
        MU_EQUIPMENT_EDIT: (state, payload) => {
            let index = state.equipmentList.indexOf(state.equipmentList.find(f=>f.equipment_id === payload.equipment.equipment_id))
            Object.assign(state.equipmentList[index], payload.equipment)
        },
        MU_EQUIPMENT_DEL: (state, payload) => {
            let index = state.equipmentList.indexOf(state.equipmentList.find(f=>f.equipment_id === payload.equipment_id))
            state.equipmentList.splice(index, 1)
        },

    },
    actions: {
        AC_EQUIPMENT: ({ commit }, payload)=>{
            commit('MU_EQUIPMENT', payload)
        },
        AC_EQUIPMENT_PUSH: ({ commit }, payload)=>{
            commit('MU_EQUIPMENT_PUSH', payload)
        },
        AC_EQUIPMENT_LIST: ({ commit }, payload)=>{
            commit('MU_EQUIPMENT_LIST', payload)
        },
        AC_EQUIPMENT_EDIT: ({ commit }, payload) =>{
            commit('MU_EQUIPMENT_EDIT', payload)
        },
        AC_EQUIPMENT_DEL: ({ commit }, payload) =>{
            commit('MU_EQUIPMENT_DEL', payload)
        },

    },
    getters: {
        GE_EQUIPMENT: state => state.equipment,
        GE_EQUIPMENT_LIST: state => state.equipmentList
    }

}
//namespaced : 각 파일별로 네임스페이스를 지정하여, 해당 파일의 상태, 변이, 액션, getter을 사용하겠다고 명시하는 문구입니다.
export default equipmentStore