
class utilityService{

    gaussianRandom() {
        let v1, v2, s
        do {
              v1 = 2 * Math.random() - 1   // -1.0 ~ 1.0 까지의 값
              v2 = 2 * Math.random() - 1  // -1.0 ~ 1.0 까지의 값
              s = v1 * v1 + v2 * v2
        } while (s >= 1 || s == 0)
        s = Math.sqrt( (-2 * Math.log(s)) / s )
        return v1 * s
      }


    NormalDistribution(mean,std_dev){
        //return mean + (this.gaussianRandom()*std_dev)
        return mean + (this.gaussianRandom()*std_dev)      
    }

    generateRandom(min,max){
        return (Math.random() * (max - min)) +min
    }

    oxygenDensityState(val){
        let color = 'green'
        let msg = ''

        if (val > 18)
        {
            color = 'green'
            msg = '안전한 상태이나 지속적 환기 필요'
        }
        else if (val >= 16)
        {
            color = 'yellow'
            msg = '호흡, 맥박의 증가, 두통, 메스꺼움, 토할 것 같음'
        }
        else if (val >= 12)
        {
            color = 'orange'
            msg = '어지럼증, 토할 것 같음, 체중지지 불능으로 추락'
        }
        else if (val >= 10)
        {
            color = 'red'
            msg = '안면창백, 의식불명, 구토'
        }
        else if(val < 10)
        {
            color = 'black'
            msg = '실신혼절, 수분 내 사망'
        }      
            let foo = { 
                'color': color,
                'msg': msg,
            }
            //console.log ('oxygenDensityState', foo)
            return foo
    }

    workerHealthState(val) {
        let color = 'green'
        let msg = ''
  
        if (val < 80 ) 	{
            if (val >= 70)
            {
                color = 'yellow'
                msg = '호흡, 맥박의 증가, 두통, 메스꺼움, 토할 것 같음'
            }
            else if (val >= 50)
            {
                color = 'orange'
                msg = '어지럼증, 토할 것 같음, 체중지지 불능으로 추락'
            }
            else if (val >= 30)
            {
                color = 'red'
                msg = '안면창백, 의식불명, 구토'
            }
            else if (val < 30)
            {
                color = 'black'
                msg = '실신혼절, 수분 내 사망'
            }
            else {
                color = 'white'
                msg = 'xxx'
            }
        }    
        let foo = { 
            'color': color,
            'msg': msg,
        }
        //console.log ('workerHealthState', foo)
        return foo
    }

}

export default new utilityService();