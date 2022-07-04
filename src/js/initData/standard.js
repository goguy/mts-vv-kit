const standard = {
    getWorkList: null,
    getEquipmentList: null,
    getDisasterList: null,
    getTdmotionList: null,
    getActivityList: null,
    getWorkEquipmentList: null,
    getWorkTdmotionList: null,
    getCodeList: null,
    getResultList: null,
    getResultItemList: null,
}

standard.getWorkList = () => {
    return [
      {
        work_id: 110,
        name: '탱크 Cleaning',
        rmk: '탱크 Cleaning 작업을 한다.',
        time: 600,
        type: 'choke',
        img_nm: 'tank_cleaning_title.png',
        img_url: 'http://localhost:9080/MTS/api/file/files/1648539858344.png',
        reg_dt: '2022-01-11'
      },  {
        work_id: 120,
        name: '탱크 샌딩 및 도장',
        rmk: '탱크 샌딩 및 도장 작업을 한다.',
        time: 800,
        type: 'standard',
        img_nm: 'tank_sanding_paint_title_fi.png',
        img_url: 'http://localhost:9080/MTS/api/file/files/1648540248346.png',
        reg_dt: '2022-01-11'
      }
    ]
}

standard.getEquipmentList = () => {
    return [
        {
            equipment_id : 118,
            name : '산소농도측정기',
            type : 'safety',
            is_outbreak: 'Y',
            require : 'Y',
            classify : 'A',
            img_nm : 'oxygen_concentration_meter.png',
            img_url : 'http://localhost:9080/MTS/api/file/files/1641889897441.png',
            reg_dt : '2022-01-11'
          },      {
            equipment_id : 119,
            name : '소음측정기',
            type : 'safety',
            is_outbreak: 'N',
            require : 'Y',
            classify : 'A',
            img_nm : 'sound_level_meter.png',
            img_url : 'http://localhost:9080/MTS/api/file/files/1641889935718.png',
            reg_dt : '2022-01-11'
          },      {
            equipment_id : 120,
            name : '열선풍속측정기',
            type : 'safety',
            is_outbreak: 'N',
            require : 'Y',
            classify : 'A',
            img_nm : 'hot_wire_wind_speed_meter.png',
            img_url : 'http://localhost:9080/MTS/api/file/files/1641889973498.png',
            reg_dt : '2022-01-11'
          },      {
            equipment_id : 121,
            name : '송풍기',
            type : 'safety',
            is_outbreak: 'N',
            require : 'Y',
            classify : 'A',
            img_nm : 'exhaust_fan.png',
            img_url : 'http://localhost:9080/MTS/api/file/files/1641890017486.png',
            reg_dt : '2022-01-11'
          },      {
            equipment_id : 80,
            name : '안전모',
            type : 'protect',
            is_outbreak: 'N',
            require : 'Y',
            classify : 'M',
            img_nm : 'safety_helmet.png',
            img_url : 'http://localhost:9080/MTS/api/file/files/1641889295464.png',
            reg_dt : '2022-01-11'
          },      {
            equipment_id : 90,
            name : '안전대',
            type : 'protect',
            is_outbreak: 'N',
            require : 'Y',
            classify : 'M',
            img_nm : 'safety_belt.png',
            img_url : 'http://localhost:9080/MTS/api/file/files/1641889341619.png',
            reg_dt : '2022-01-11'
          },      {
            equipment_id : 100,
            name : '안전화',
            type : 'protect',
            is_outbreak: 'N',
            require : 'Y',
            classify : 'M',
            img_nm : 'safety_boots.png',
            img_url : 'http://localhost:9080/MTS/api/file/files/1641889391053.png',
            reg_dt : '2022-01-11'
          },      {
            equipment_id : 110,
            name : '보안면',
            type : 'protect',
            is_outbreak: 'N',
            require : 'Y',
            classify : 'M',
            img_nm : 'safety_face.png',
            img_url : 'http://localhost:9080/MTS/api/file/files/1641889461057.png',
            reg_dt : '2022-01-11'
          },      {
            equipment_id : 111,
            name : '보안경',
            type : 'protect',
            is_outbreak: 'N',
            require : 'Y',
            classify : 'A',
            img_nm : 'safety_glasses.png',
            img_url : 'http://localhost:9080/MTS/api/file/files/1641889507515.png',
            reg_dt : '2022-01-11'
          },      {
            equipment_id : 112,
            name : '보호복',
            type : 'protect',
            is_outbreak: 'N',
            require : 'Y',
            classify : 'M',
            img_nm : 'protective_clothing.png',
            img_url : 'http://localhost:9080/MTS/api/file/files/1641889537678.png',
            reg_dt : '2022-01-11'
          },      {
            equipment_id : 113,
            name : '안전장갑',
            type : 'protect',
            is_outbreak: 'N',
            require : 'Y',
            classify : 'M',
            img_nm : 'safety_gloves.png',
            img_url : 'http://localhost:9080/MTS/api/file/files/1641889597867.png',
            reg_dt : '2022-01-11'
          },      {
            equipment_id : 115,
            name : '방독마스크',
            type : 'protect',
            is_outbreak: 'N',
            require : 'Y',
            classify : 'A',
            img_nm : 'proof_mask.png',
            img_url : 'http://localhost:9080/MTS/api/file/files/1641889704186.png',
            reg_dt : '2022-01-11'
          },      {
            equipment_id : 114,
            name : '방진마스크',
            type : 'protect',
            is_outbreak: 'N',
            require : 'Y',
            classify : 'A',
            img_nm : 'dust_mask.png',
            img_url : 'http://localhost:9080/MTS/api/file/files/1641889759213.png',
            reg_dt : '2022-01-11'
          },      {
            equipment_id : 116,
            name : '귀마개',
            type : 'protect',
            is_outbreak: 'N',
            require : 'Y',
            classify : 'A',
            img_nm : 'ear_plug.png',
            img_url : 'http://localhost:9080/MTS/api/file/files/1641889828248.png',
            reg_dt : '2022-01-11'
          },      {
            equipment_id : 117,
            name : '송기마스크',
            type : 'protect',
            is_outbreak: 'N',
            require : 'Y',
            classify : 'A',
            img_nm : 'air_mask.png',
            img_url : 'http://localhost:9080/MTS/api/file/files/1641889860195.png',
            reg_dt : '2022-01-11'
          },      {
            equipment_id : 122,
            name : '배풍기',
            type : 'safety',
            is_outbreak: 'N',
            require : 'Y',
            classify : 'A',
            img_nm : 'air_blower.png',
            img_url : 'http://localhost:9080/MTS/api/file/files/1641890129839.png',
            reg_dt : '2022-01-11'
          },      {
            equipment_id : 123,
            name : '방폭등',
            type : 'safety',
            is_outbreak: 'N',
            require : 'Y',
            classify : 'M',
            img_nm : 'explosion-proof_light.png',
            img_url : 'http://localhost:9080/MTS/api/file/files/1641890162034.png',
            reg_dt : '2022-01-11'
          }
        ]    
}

standard.getTdmotionList = () => {
    return [
      {
        motion_id: 154,
        name: '작업언전환경구축',
        type: 'normal',
        is_outbreak: 'N',
        rmk: '탱크 샌딩 및 도장 관련작업',
        disaster_id: 51,
        play_time: 0,
        video_nm: '내부청소_0128.mp4',
        video_type: 'video/mp4',
        video_url: 'http://localhost:9080/MTS/api/file/videos/1644370516487.mp4',
        img_nm: 'saveTank.png',
        img_url: 'http://localhost:9080/MTS/api/file/files/1641892718093.png',
        reg_dt: '2022-01-11'
      },    {
        motion_id: 155,
        name: '샌딩',
        type: 'normal',
        is_outbreak: 'N',
        rmk: '탱크 샌딩 및 도장 관련작업',
        disaster_id: 59,
        play_time: 10,
        video_nm: '가스농도 측정_0128.mp4',
        video_type: 'video/mp4',
        video_url: 'http://localhost:9080/MTS/api/file/videos/1644370530860.mp4',
        img_nm: 'saveTank.png',
        img_url: 'http://localhost:9080/MTS/api/file/files/1641892761095.png',
        reg_dt: '2022-01-11'
      },    {
        motion_id: 160,
        name: '균열검사 및 용접',
        type: 'normal',
        is_outbreak: 'N',
        rmk: '탱크 샌딩 및 도장 관련작업',
        disaster_id: 59,
        play_time: 19,
        video_nm: '내부청소_0128.mp4',
        video_type: 'video/mp4',
        video_url: 'http://localhost:9080/MTS/api/file/videos/1644370554268.mp4',
        img_nm: 'saveTank.png',
        img_url: 'http://localhost:9080/MTS/api/file/files/1641892823304.png',
        reg_dt: '2022-01-11'
      },    {
        motion_id: 156,
        name: '도장',
        type: 'normal',
        is_outbreak: 'N',
        rmk: '탱크 샌딩 및 도장 관련작업',
        disaster_id: 51,
        play_time: 10,
        video_nm: '가스농도 측정_0128.mp4',
        video_type: 'video/mp4',
        video_url: 'http://localhost:9080/MTS/api/file/videos/1644370572697.mp4',
        img_nm: 'saveTank.png',
        img_url: 'http://localhost:9080/MTS/api/file/files/1641892967488.png',
        reg_dt: '2022-01-11'
      },    {
        motion_id: 157,
        name: '건조 및 도막검사',
        type: 'normal',
        is_outbreak: 'N',
        rmk: '탱크 샌딩 및 도장 관련작업',
        disaster_id: 50,
        play_time: 19,
        video_nm: '내부청소_0128.mp4',
        video_type: 'video/mp4',
        video_url: 'http://localhost:9080/MTS/api/file/videos/1644370584980.mp4',
        img_nm: 'saveTank.png',
        img_url: 'http://localhost:9080/MTS/api/file/files/1641893040598.png',
        reg_dt: '2022-01-11'
      },    {
        motion_id: 152,
        name: '유해물질 적정농도 확인',
        type: 'normal',
        is_outbreak: 'N',
        rmk: '탱크 Cleaning 관련작업',
        disaster_id: 51,
        play_time: 11,
        video_nm: '04_유해물질 적정농도 확인_final.mp4',
        video_type: 'video/mp4',
        video_url: 'http://localhost:9080/MTS/api/file/videos/1648517182058.mp4',
        img_nm: 'oxygen_measure_final.png',
        img_url: 'http://localhost:9080/MTS/api/file/files/1648532844551.png',
        reg_dt: '2022-01-11'
      },    {
        motion_id: 153,
        name: '탱크 청소',
        type: 'normal',
        is_outbreak: 'Y',
        rmk: '탱크 Cleaning 관련작업',
        disaster_id: 51,
        play_time: 174,
        video_nm: '05_탱크 청소_final.mp4',
        video_type: 'video/mp4',
        video_url: 'http://localhost:9080/MTS/api/file/videos/1648517212830.mp4',
        img_nm: 'tank_cleaning_final.png',
        img_url: 'http://localhost:9080/MTS/api/file/files/1648532874107.png',
        reg_dt: '2022-01-11'
      },    {
        motion_id: 158,
        name: '산소농도측정',
        type: 'measure',
        is_outbreak: 'N',
        rmk: '산소농도측정',
        disaster_id: 50,
        play_time: 11,
        video_nm: '04_유해물질 적정농도 확인_final.mp4',
        video_type: 'video/mp4',
        video_url: 'http://localhost:9080/MTS/api/file/videos/1648517876778.mp4',
        img_nm: 'oxygen_measure_final_1.png',
        img_url: 'http://localhost:9080/MTS/api/file/files/1648532919326.png',
        reg_dt: '2022-01-11'
      },    {
        motion_id: 159,
        name: '돌발상황',
        type: 'outbreak',
        is_outbreak: 'N',
        rmk: '돌발상황',
        disaster_id: 51,
        play_time: 40,
        video_nm: '06_돌발상황 통합_final.mp4',
        video_type: 'video/mp4',
        video_url: 'http://localhost:9080/MTS/api/file/videos/1648517277214.mp4',
        img_nm: 'outbreak_final.png',
        img_url: 'http://localhost:9080/MTS/api/file/files/1648532938727.png',
        reg_dt: '2022-01-11'
      },    {
        motion_id: 170,
        name: '자력탈출',
        type: 'escape',
        is_outbreak: 'N',
        rmk: '자력탈출',
        disaster_id: 59,
        play_time: 11,
        video_nm: '08_자력탈출_final.mp4',
        video_type: 'video/mp4',
        video_url: 'http://localhost:9080/MTS/api/file/videos/1648517321049.mp4',
        img_nm: 'self_escape_final.png',
        img_url: 'http://localhost:9080/MTS/api/file/files/1648532963479.png',
        reg_dt: '2022-01-11'
      },    {
        motion_id: 140,
        name: '작업복/보호구 착용',
        type: 'normal',
        is_outbreak: 'N',
        rmk: '탱크 Cleaning 관련작업',
        disaster_id: 51,
        play_time: 16,
        video_nm: '01_작업복,보호구 착용_final.mp4',
        video_type: 'video/mp4',
        video_url: 'http://localhost:9080/MTS/api/file/videos/1648516995029.mp4',
        img_nm: 'wear_work_clothes_final1.png',
        img_url: 'http://localhost:9080/MTS/api/file/files/1648531182184.png',
        reg_dt: '2022-01-11'
      },    {
        motion_id: 180,
        name: '외부구조',
        type: 'outbreak',
        is_outbreak: 'N',
        rmk: '외부구조_돌발',
        disaster_id: 51,
        play_time: 14,
        video_nm: '10_외부구조_final.mp4',
        video_type: 'video/mp4',
        video_url: 'http://localhost:9080/MTS/api/file/videos/1648517980783.mp4',
        img_nm: 'out_side_succour_final.png',
        img_url: 'http://localhost:9080/MTS/api/file/files/1648532993156.png',
        reg_dt: '2022-03-10'
      },    {
        motion_id: 150,
        name: '측정기 이상 여부 체크',
        type: 'normal',
        is_outbreak: 'N',
        rmk: '탱크 Cleaning 관련작업',
        disaster_id: 51,
        play_time: 10,
        video_nm: '02_측정기 이상여부 체크_final.mp4',
        video_type: 'video/mp4',
        video_url: 'http://localhost:9080/MTS/api/file/videos/1648517030705.mp4',
        img_nm: 'normal_work_gas_measure_fin.png',
        img_url: 'http://localhost:9080/MTS/api/file/files/1648532748424.png',
        reg_dt: '2022-01-11'
      },    {
        motion_id: 151,
        name: '탱크 내부 진입',
        type: 'normal',
        is_outbreak: 'N',
        rmk: '탱크 Cleaning 관련작업',
        disaster_id: 51,
        play_time: 12,
        video_nm: '03_탱크 내부 진입_final.mp4',
        video_type: 'video/mp4',
        video_url: 'http://localhost:9080/MTS/api/file/videos/1648517168678.mp4',
        img_nm: 'enter_tank_final.png',
        img_url: 'http://localhost:9080/MTS/api/file/files/1648532818988.png',
        reg_dt: '2022-01-11'
      }
        ]
}

standard.getDisasterList = () => {
    return [
        {
            disaster_id : 50,
            name : '무재해',
            rate : 'Z',
            rmk : '재해없음',
            reg_dt : '2022-01-11'
          },      {
            disaster_id : 51,
            name : '질식/중독',
            rate : 'A',
            rmk : '음식, 약물, 가스 등에 의한 중독이나 질식된 상해',
            reg_dt : '2022-01-11'
          },      {
            disaster_id : 52,
            name : '골절',
            rate : 'A',
            rmk : '뼈가 부러진 상태',
            reg_dt : '2022-01-11'
          },      {
            disaster_id : 53,
            name : '동상',
            rate : 'A',
            rmk : '저온물 접촉으로 생긴 동상 상해',
            reg_dt : '2022-01-11'
          },      {
            disaster_id : 54,
            name : '자상',
            rate : 'A',
            rmk : '칼날 등 날카로운 물건에 찔린 상해',
            reg_dt : '2022-01-11'
          },      {
            disaster_id : 55,
            name : '좌상',
            rate : 'A',
            rmk : '타박, 충돌, 추락등으로 피부 표면보다는 피하조직 또는 근육부를 다친 상해',
            reg_dt : '2022-01-11'
          },      {
            disaster_id : 56,
            name : '절상',
            rate : 'A',
            rmk : '신체부위가 절단된 상태',
            reg_dt : '2022-01-11'
          },      {
            disaster_id : 57,
            name : '찰과상',
            rate : 'B',
            rmk : '스치거나 문질러서 벗겨진 상태',
            reg_dt : '2022-01-11'
          },      {
            disaster_id : 58,
            name : '창상',
            rate : 'A',
            rmk : '창, 칼 등에 배인 상태',
            reg_dt : '2022-01-11'
          },      {
            disaster_id : 59,
            name : '화상',
            rate : 'A',
            rmk : '화재 또는 고온물 접촉으로 인한 상해',
            reg_dt : '2022-01-11'
          },      {
            disaster_id : 60,
            name : '청력장애',
            rate : 'A',
            rmk : '청력이 감되 또는 난청이 된 상해',
            reg_dt : '2022-01-11'
          },      {
            disaster_id : 61,
            name : '시력장애',
            rate : 'A',
            rmk : '시력이 감퇴 또는 실명된 상해',
            reg_dt : '2022-01-11'
          },      {
            disaster_id : 62,
            name : '익사',
            rate : 'A',
            rmk : '물에 빠져 호흡 불가능으로 사망',
            reg_dt : '2022-01-11'
          },      {
            disaster_id : 63,
            name : '피부병',
            rate : 'B',
            rmk : '피부에 발생한 질환',
            reg_dt : '2022-01-11'
          }
        ]
}

standard.getActivityList = () => {
    return [
      {
        "activity_id": 50,
        "parent_id": null,
        "name": "MTS",
        "level": 0,
        "source": "N",
        "type": "root",
        "rmk": "SYSTEM명",
        "reg_dt": "2022-01-11"
      },
      {
          "activity_id": 51,
          "parent_id": 50,
          "name": "소개",
          "level": 1,
          "source": "N",
          "type": "info",
          "rmk": "소개",
          "reg_dt": "2022-01-11"
      },
      {
          "activity_id": 52,
          "parent_id": 50,
          "name": "정비작업선택",
          "level": 1,
          "source": "N",
          "type": "select",
          "rmk": "정비작업선택",
          "reg_dt": "2022-01-11"
      },
      {
          "activity_id": 53,
          "parent_id": 50,
          "name": "교육생정보입력",
          "level": 1,
          "source": "N",
          "type": "form",
          "rmk": "교육생정보입력",
          "reg_dt": "2022-01-11"
      },
      {
          "activity_id": 54,
          "parent_id": 50,
          "name": "작업준비하기",
          "level": 1,
          "source": "Y",
          "type": "folder",
          "rmk": "작업준비하기",
          "reg_dt": "2022-01-11"
      },
      {
          "activity_id": 55,
          "parent_id": 54,
          "name": "작업준비",
          "level": 2,
          "source": "PrepareWork",
          "type": "agree",
          "rmk": "작업준비",
          "reg_dt": "2022-01-11"
      },
      {
          "activity_id": 56,
          "parent_id": 54,
          "name": "작업가이드",
          "level": 2,
          "source": "GuideWork",
          "type": "agree",
          "rmk": "작업가이드",
          "reg_dt": "2022-01-11"
      },
      {
          "activity_id": 57,
          "parent_id": 54,
          "name": "작업허가서",
          "level": 2,
          "source": "OrderWork",
          "type": "agree",
          "rmk": "작업허가서",
          "reg_dt": "2022-01-11"
      },
      {
          "activity_id": 60,
          "parent_id": 54,
          "name": "안전장비선택",
          "level": 2,
          "source": "SafetyEquipmentWork",
          "type": "check",
          "rmk": "안전장비선택",
          "reg_dt": "2022-01-11"
      },
      {
          "activity_id": 61,
          "parent_id": 50,
          "name": "작업하기",
          "level": 1,
          "source": "Y",
          "type": "folder",
          "rmk": "작업하기",
          "reg_dt": "2022-01-11"
      },
      {
          "activity_id": 64,
          "parent_id": 50,
          "name": "작업보고서",
          "level": 1,
          "source": "N",
          "type": "report",
          "rmk": "작업보고서",
          "reg_dt": "2022-01-11"
      },
      {
          "activity_id": 59,
          "parent_id": 54,
          "name": "보호구장비선택",
          "level": 2,
          "source": "ProtectEquipmentWork",
          "type": "check",
          "rmk": "보호구장비선택",
          "reg_dt": "2022-01-11"
      }
    ]
}

standard.getWorkEquipmentList = () => {
    return [
        {
            work_id : 110,
            equipment_id : 80
          },      {
            work_id : 110,
            equipment_id : 90
          },      {
            work_id : 110,
            equipment_id : 100
          },      {
            work_id : 110,
            equipment_id : 112
          },      {
            work_id : 110,
            equipment_id : 113
          },      {
            work_id : 110,
            equipment_id : 115
          },      {
            work_id : 110,
            equipment_id : 118
          },      {
            work_id : 110,
            equipment_id : 121
          },      {
            work_id : 110,
            equipment_id : 122
          },      {
            work_id : 110,
            equipment_id : 123
          },      {
            work_id : 120,
            equipment_id : 80
          },      {
            work_id : 120,
            equipment_id : 90
          },      {
            work_id : 120,
            equipment_id : 100
          },      {
            work_id : 120,
            equipment_id : 110
          },      {
            work_id : 120,
            equipment_id : 112
          },      {
            work_id : 120,
            equipment_id : 113
          },      {
            work_id : 120,
            equipment_id : 118
          },      {
            work_id : 120,
            equipment_id : 121
          },      {
            work_id : 120,
            equipment_id : 122
          },      {
            work_id : 120,
            equipment_id : 123
          }
    ]
}

standard.getWorkTdmotionList = () => {
    return [
      {
        work_id: 120,
        motion_id: 154,
        disp_ord: 1,
        type: 'normal'
    },
    {
        work_id: 120,
        motion_id: 155,
        disp_ord: 2,
        type: 'normal'
    },
    {
        work_id: 120,
        motion_id: 156,
        disp_ord: 4,
        type: 'normal'
    },
    {
        work_id: 120,
        motion_id: 157,
        disp_ord: 5,
        type: 'normal'
    },
    {
        work_id: 120,
        motion_id: 158,
        disp_ord: 1,
        type: 'measure'
    },
    {
        work_id: 120,
        motion_id: 159,
        disp_ord: 2,
        type: 'outbreak'
    },
    {
        work_id: 120,
        motion_id: 160,
        disp_ord: 3,
        type: 'normal'
    },
    {
        work_id: 120,
        motion_id: 170,
        disp_ord: 3,
        type: 'escape'
    },
    {
        work_id: 110,
        motion_id: 140,
        disp_ord: 1,
        type: 'normal'
    },
    {
        work_id: 110,
        motion_id: 150,
        disp_ord: 2,
        type: 'normal'
    },
    {
        work_id: 110,
        motion_id: 151,
        disp_ord: 3,
        type: 'normal'
    },
    {
        work_id: 110,
        motion_id: 152,
        disp_ord: 4,
        type: 'normal'
    },
    {
        work_id: 110,
        motion_id: 153,
        disp_ord: 5,
        type: 'normal'
    },
    {
        work_id: 110,
        motion_id: 158,
        disp_ord: 1,
        type: 'measure'
    },
    {
        work_id: 110,
        motion_id: 159,
        disp_ord: 1,
        type: 'outbreak'
    },
    {
        work_id: 110,
        motion_id: 170,
        disp_ord: 1,
        type: 'escape'
    },
    {
        work_id: 110,
        motion_id: 180,
        disp_ord: 2,
        type: 'outbreak'
    }
    ]
}

standard.getCodeList = () => {
  return [
    {
      "code_id": 1,
      "code": "motion_group",
      "name": "모션그룹",
      "group_code_id": null,
      "level": 0,
      "attr1": "",
      "attr2": "",
      "attr3": "",
      "rmk": "모션그룹"
    },
    {
        "code_id": 2,
        "code": "normal",
        "name": "정상",
        "group_code_id": 1,
        "level": 1,
        "attr1": "",
        "attr2": "",
        "attr3": "",
          "rmk": "정상"
    },
    {
        "code_id": 3,
        "code": "outbreak",
        "name": "돌발",
        "group_code_id": 1,
        "level": 1,
        "attr1": "",
        "attr2": "",
        "attr3": "",
          "rmk": "돌발"
    },
    {
      "code_id": 4,
      "code": "measure",
      "name": "측정",
      "group_code_id": 1,
      "level": 1,
      "attr1": "",
      "attr2": "",
      "attr3": "",
      "rmk": "측정"
    },

    {
        "code_id": 5,
        "code": "yn_group",
        "name": "yn그룹",
        "group_code_id": null,
        "level": 0,
        "attr1": "",
        "attr2": "",
        "attr3": "",
          "rmk": "yn그룹"
    },
    {
        "code_id": 6,
        "code": "Y",
        "name": "Y",
        "group_code_id": 5,
        "level": 1,
        "attr1": "",
        "attr2": "",
        "attr3": "",
          "rmk": "Y"
    },
    {
        "code_id": 7,
        "code": "N",
        "name": "N",
        "group_code_id": 5,
        "level": 1,
        "attr1": "",
        "attr2": "",
        "attr3": "",
          "rmk": "N"
    },
    {
        "code_id": 8,
        "code": "equip_group",
        "name": "장비그룹",
        "group_code_id": null,
        "level": 0,
        "attr1": "",
        "attr2": "",
        "attr3": "",
          "rmk": "장비그룹"
    },
    {
        "code_id": 9,
        "code": "protect",
        "name": "개인보호구장비",
        "group_code_id": 8,
        "level": 1,
        "attr1": "",
        "attr2": "",
        "attr3": "",
          "rmk": "개인보호구장비"
    },
    {
        "code_id": 10,
        "code": "safety",
        "name": "안전장비",
        "group_code_id": 8,
        "level": 1,
        "attr1": "",
        "attr2": "",
        "attr3": "",
          "rmk": "안전장비"
    },
    {
        "code_id": 11,
        "code": "work",
        "name": "작업장비",
        "group_code_id": 8,
        "level": 1,
        "attr1": "",
        "attr2": "",
        "attr3": "",
          "rmk": "작업장비"
    },  
    {
      "code_id": 12,
      "code": "outbreak_group",
      "name": "돌발그룹",
      "group_code_id": null,
      "level": 0,
      "attr1": "",
      "attr2": "",
      "attr3": "",
        "rmk": "돌발그룹"
  },  
  {
    "code_id": 13,
    "code": "standard",
    "name": "표준",
    "group_code_id": 12,
    "level": 1,
    "attr1": "standard_work",
    "attr2": "standard_report",
    "attr3": "",
      "rmk": "표준"
  },  
  {
      "code_id": 14,
      "code": "choke",
      "name": "질식",
      "group_code_id": 12,
      "level": 1,
      "attr1": "choke_work",
      "attr2": "choke_report",
      "attr3": "",
        "rmk": "질식"
  },  
  {
      "code_id": 15,
      "code": "explose",
      "name": "폭발",
      "group_code_id": 12,
      "level": 1,
      "attr1": "explose_work",
      "attr2": "explose_report",
      "attr3": "",
        "rmk": "폭발"
  },  
    ]
}

standard.getResultList = () => {
  return [
    {
      result_id: 1,
      name: '질식관련',
      type:'choke',
      rmk: '산소농도측정기',
      reg_dt:'',
    },
    {
      result_id: 2,
      name: '표준',
      type:'standard',
      rmk: '일반적 작업',
      reg_dt:'',
    }
  ]
}

standard.getResultItemList = () => {
  return [
    {
      result_item_id: 1,
      result_id: 1,
      name: 'guide',
      score: 5,
      disp_ord: 1,
      rmk: '작업가이드 숙지',
    },
    {
      result_item_id: 2,
      result_id: 1,
      name: 'permit',
      score: 5,
      disp_ord: 2,
      rmk: '작업허가서 발행',
    },
    {
      result_item_id: 3,
      result_id: 1,
      name: 'equip_choice',
      score: 10,
      disp_ord: 3,
      rmk: '작업한 보호구 및 안전장비 선택여부',
    },
    {
      result_item_id: 4,
      result_id: 1,
      name: 'equip_check',
      score: 10,
      disp_ord: 4,
      rmk: '산소농도측정기 작동상태 확인 및 농도측정',
    },
    {
      result_item_id: 5,
      result_id: 1,
      name: 'work_check',
      score: 15,
      disp_ord: 5,
      rmk: '작업 중 산소농도 측정여부',
    },
    {
      result_item_id: 6,
      result_id: 1,
      name: 'work_time',
      score: 5,
      disp_ord: 6,
      rmk: '작업시간 준수여부',
    },
    {
      result_item_id: 7,
      result_id: 1,
      name: 'outbreak_recognize',
      score: 20,
      disp_ord: 7,
      rmk: '돌발상황 발생 인지여부',
    },
    {
      result_item_id: 8,
      result_id: 1,
      name: 'outbreak_cope',
      score: 30,
      disp_ord: 8,
      rmk: '돌발상황 발생 대처여부',
    },
    {
      result_item_id: 9,
      result_id: 2,
      name: 'guide',
      score: 10,
      disp_ord: 1,
      rmk: '작업가이드 숙지',
    },
    {
      result_item_id: 10,
      result_id: 2,
      name: 'permit',
      score: 10,
      disp_ord: 2,
      rmk: '작업허가서 발행',
    },
    {
      result_item_id: 11,
      result_id: 2,
      name: 'equip_choice',
      score: 30,
      disp_ord: 3,
      rmk: '작업한 보호구 및 안전장비 선택여부',
    },
    {
      result_item_id: 12,
      result_id: 2,
      name: 'work_time',
      score: 10,
      disp_ord: 4,
      rmk: '작업시간 준수여부',
    },
    {
      result_item_id: 13,
      result_id: 2,
      name: 'work_confirm',
      score: 40,
      disp_ord: 5,
      rmk: '작업 확인 여부',
    },
  ]
}

export default standard