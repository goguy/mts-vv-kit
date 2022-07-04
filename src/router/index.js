import Vue from 'vue'
import VueRouter from 'vue-router'
//import VueCookies from 'vue-cookies'
//import Home from '../views/Home.vue'

// layouts
import Admin from '@/layouts/Admin.vue'
import Auth from '@/layouts/Auth.vue'
import Work from '@/layouts/Work.vue'

// views for Work layout
import ChoiceWork from '@/views/work/ChoiceWork.vue'
import Working from '@/views/work/Working.vue'
import WorkPlay from '@/views/work/WorkPlay.vue'
import CaseWorking from '@/views/work/CaseWorking.vue'
import ReportWork from '@/views/work/ReportWork.vue'

//view for Work Rating layout
import Rating from '@/views/work/Rating.vue'
import PrepareWork from '@/views/work/rate/PrepareWork.vue'
import GuideWork from '@/views/work/rate/GuideWork.vue'
import OrderWork from '@/views/work/rate/OrderWork.vue'
import ChoiceEquipmentWork from '@/views/work/rate/ChoiceEquipmentWork.vue'
import ProtectEquipmentWork from '@/views/work/rate/ProtectEquipmentWork.vue'
import SafetyEquipmentWork from '@/views/work/rate/SafetyEquipmentWork.vue'
import DoWork from '@/views/work/rate/DoWork.vue'
import DoCheckTdmotionWork from '@/views/work/rate/DoCheckTdmotionWork.vue'


//view for Work Report
//import Reporting from '@/views/work/report/Reporting.vue'
import Reporting from '@/views/work/Reporting.vue'
import Evaling from '@/views/work/Evaling.vue'
import ReportReport from '@/views/work/report/Report.vue'
import CardsReport from '@/views/work/report/Cards.vue'
import ExpansionPanelsReport from '@/views/work/report/ExpansionPanels.vue'
import SteppersVerticalReport from '@/views/work/report/SteppersVertical.vue'


// views for Admin layout
import Dashboard from '@/views/admin/Dashboard.vue'
import Maps from '@/views/admin/Maps.vue'

// views for Auth layout
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'

// views without layouts
import Landing from '@/views/Landing.vue'
import Profile from '@/views/Profile.vue'
import Index from '@/views/Index.vue'

// views admin
import WorkInfo from '@/views/admin/stad/WorkInfo.vue'
import EquipInfo from '@/views/admin/stad/EquipInfo.vue'
import TdmotionInfo from '@/views/admin/stad/TdmotionInfo.vue'
import ActivityInfo from '@/views/admin/stad/ActivityInfo.vue'
import DisasterInfo from '@/views/admin/stad/DisasterInfo.vue'
import WorkEquipmentInfo from '@/views/admin/stad/WorkEquipmentInfo.vue'
import WorkTdmotionInfo from '@/views/admin/stad/WorkTdmotionInfo.vue'
import CodeInfo from '@/views/admin/stad/CodeInfo.vue'
import ResultItemInfo from '@/views/admin/stad/ResultItemInfo.vue'

import WorkerInfo from '@/views/admin/edun/WorkerInfo.vue'
import WorkerActivityInfo from '@/views/admin/edun/WorkerActivityInfo.vue'
import WorkerEquipmentInfo from '@/views/admin/edun/WorkerEquipmentInfo.vue'
import WorkerTdmotionInfo from '@/views/admin/edun/WorkerTdmotionInfo.vue'
import WorkerReportInfo from '@/views/admin/edun/WorkerReportInfo.vue'
import WorkerResultItemInfo from '@/views/admin/edun/WorkerResultItemInfo.vue'

import UserInfo from '@/views/admin/sysm/UserInfo.vue'


// js
import token from '@/js/auth/token.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/dashboard',
    component: Admin,
    children: [
      {
        path: '/admin/dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: '/admin/stad/workInfo',
        name: '정비작업',
        component: WorkInfo,
      },
      {
        path: '/admin/stad/equipInfo',
        name: '장비',
        component: EquipInfo,
      },
      {
        path: '/admin/stad/tdmotionInfo',
        name: '영상',
        component: TdmotionInfo,
      },
      {
        path: '/admin/stad/activityInfo',
        name: '활동',
        component: ActivityInfo,
      },
      {
        path: '/admin/stad/disasterInfo',
        name: '재해',
        component: DisasterInfo,
      },
      {
        path: '/admin/stad/workEquipmentInfo',
        name: '정비작업별 장비선택',
        component: WorkEquipmentInfo,
      },
      {
        path: '/admin/stad/workTdmotionInfo',
        name: '정비작업별 모션선택',
        component: WorkTdmotionInfo,
      },
      {
        path: '/admin/stad/codeInfo',
        name: '기초코드',
        component: CodeInfo,
      },            
      {
        path: '/admin/stad/resultItemInfo',
        name: '유형별 보고서',
        component: ResultItemInfo,
      },
      {
        path: '/admin/edun/workerInfo',
        name: '수강생정보',
        component: WorkerInfo,
      },
      {
        path: '/admin/edun/workerActivityInfo',
        name: '수강생활동정보',
        component: WorkerActivityInfo,
      },
      {
        path: '/admin/edun/workerEquipmentInfo',
        name: '수강생선택장비정보',
        component: WorkerEquipmentInfo,
      },
      {
        path: '/admin/edun/workerTdmotionInfo',
        name: '수강생선택모션정보',
        component: WorkerTdmotionInfo,
      },
      {
        path: '/admin/edun/workerReportInfo',
        name: '수강생보고서정보Copey',
        component: WorkerReportInfo,
      },
      {
        path: '/admin/edun/workerResultItemInfo',
        name: '수강생보고서정보',
        component: WorkerResultItemInfo,
      },
      {
        path: '/admin/sysm/userInfo',
        name: '관리자정보',
        component: UserInfo,
      },
      {
        path: '/admin/maps',
        name: 'Maps',
        component: Maps,
      },
      // Test Pages
      {
        name: 'User Profile',
        path: '/admin/user',
        component: () => import('@/views/admin/UserProfile'),
      },
      {
        name: 'Notifications',
        path: '/admin/notifications',
        component: () => import('@/views/admin/Notifications'),
      },
      {
        name: 'Icons',
        path: '/admin/icons',
        component: () => import('@/views/admin/Icons'),
      },
      {
        name: 'Typography',
        path: '/admin/typography',
        component: () => import('@/views/admin/Typography'),
      },
      // Tables
      {
        name: 'Regular Tables',
        path: '/admin/regular-tables',
        component: () => import('@/views/admin/RegularTables'),
      },
      // Maps
      {
        name: 'Google Maps',
        path: '/admin/google-maps',
        component: () => import('@/views/admin/GoogleMaps'),
      },
      // Upgrade
      {
        name: 'Upgrade',
        path: '/admin/upgrade',
        component: () => import('@/views/admin/Upgrade'),
      },
    ],
  },
  {
    path: '/auth',
    name: 'Auth',
    redirect: '/auth/login',
    component: Auth,
    meta: { unauthorized : true },
    children: [
      {
        path: '/auth/login',
        name: 'Login',
        component: Login,
      },
      {
        path: '/auth/register',
        name: 'Register',
        component: Register,
      },
    ],
  },
  {
    path: '/work',
    name: 'Work',
    redirect: '/work/choiceWork',
    component: Work,
    meta: { unauthorized : true },
    children: [
      {
        path: '/work/choiceWork',
        name: 'ChoiceWork',
        component: ChoiceWork,
      },
      {
        path: '/work/working',
        name: 'Working',
        component: Working,
      },
      {
        path: '/work/workPlay',
        name: 'WorkPlay',
        component: WorkPlay,
      },
      {
        path: '/work/caseWorking',
        name: 'CaseWorking',
        component: CaseWorking,
      },
      {
        path: '/work/reporting',
        name: 'Reporting',
        component: Reporting,
      }, 
      {
        path: '/work/evaling',
        name: 'Evaling',
        component: Evaling,
      }, 
      {
        path: '/work/reportWork',
        name: 'ReportWork',
        redirect: '/work/report/report',
        component: ReportWork,
        children:[
          {
            path: '/work/report/report',
            name: 'ReportReport',
            component: ReportReport,
          },
          {
            path: '/work/report/cards',
            name: 'CardsReport',
            component: CardsReport,
          },
          {
            path: '/work/report/expansionPanels',
            name: 'ExpansionPanelsReport',
            component: ExpansionPanelsReport,
          },
          {
            path: '/work/report/steppersVertical',
            name: 'SteppersVerticalReport',
            component: SteppersVerticalReport,
          },
        ]
      },
      {
        path: '/work/rate',
        name: 'Rating',
        redirect: '/work/rate/prepareWork',
        component: Rating,
        children: [
          {
            path: '/work/rate/prepareWork',
            name: 'PrepareWork',
            component: PrepareWork,
          },
          {
            path: '/work/rate/guideWork',
            name: 'GuideWork',
            component: GuideWork,
          },
          {
            path: '/work/rate/orderWork',
            name: 'OrderWork',
            component: OrderWork,
          },
          {
            path: '/work/rate/choiceEquipmentWork',
            name: 'ChoiceEquipmentWork',
            component: ChoiceEquipmentWork,
          },
          {
            path: '/work/rate/protectEquipmentWork',
            name: 'ProtectEquipmentWork',
            component: ProtectEquipmentWork,
          },
          {
            path: '/work/rate/safetyEquipmentWork',
            name: 'SafetyEquipmentWork',
            component: SafetyEquipmentWork,
          },
          {
            path: '/work/rate/doWork',
            name: 'DoWork',
            component: DoWork,
          },
          {
            path: '/work/rate/doCheckTdmotionWork',
            name: 'DoCheckTdmotionWork',
            component: DoCheckTdmotionWork,
          },
        ]   
      },
    ],
  },
  {
    path: '/landing',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: { unauthorized : true },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//네비게이션 가드((뷰 라우터로 URL 접근에 대해서 처리할 수 있음)
router.beforeEach( async(to, from, next) => { //여기서 모든 라우팅이 대기 상태가 됨
  /**
   * to: 이동할 url 정보가 담긴 라우터 객체
   * from: 현재 url 정보가 담긴 라우터 객체
   * next: to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수
   * next() 가 호출되기 전까지 화면 전환되지 않음
   */

   if (to.matched.some(record => record.meta.unauthorized) || token.getAccessToken()!==null ){
      return next()   
   }
   
   if(token.getAccessToken()===null && token.getRefreshToken() !== null){
    //refreshToken은 있고 accessToken이 없을 경우 토큰 재발급 요청
      token.setAccessToken('MTS')
  }
   
  return next({name: 'Login'})

})


export default router
