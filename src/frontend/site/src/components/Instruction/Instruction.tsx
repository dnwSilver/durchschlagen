import {Button, Card, Classes, Code, Elevation, H3, Intent, Overlay} from '@blueprintjs/core'
import {useEffect, useState}                                         from 'react'
import {useLocalStorage}                                             from '../../hooks/useLocalStorage'

const Instruction = ()=>{
  const [isShowInstruction, setIsShowInstruction] = useLocalStorage('isShowInstruction', 'false')
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = ()=>{
    setIsOpen(!isOpen)
  }

  const handleClose = ()=>{
    setIsOpen(false)
  }
  useEffect(()=>{
    if(isShowInstruction!=='true'){
      setIsShowInstruction('true')
      setIsOpen(true)
    }
  }, [isShowInstruction, setIsShowInstruction])
  return <>
    <Button style={{position: 'fixed', bottom: 0, left: '46%', width: '8%'}} intent={Intent.PRIMARY} icon="git-repo"
            onClick={handleOpen}
            text="Tutorial"/>
    <Overlay onClose={handleClose} autoFocus={false} isOpen={isOpen} hasBackdrop
             className={Classes.OVERLAY_SCROLL_CONTAINER}>
      <Card style={{width: '50%', top: '10%', left: '25%'}} elevation={Elevation.FOUR}>
        <H3>Самый уязвимый сайт в мире! 🙃</H3>
        <p>
          Рад видеть тебя на этом сайте. Если ты попал сюда значит судьба занесла тебя на небольшое испытание - <b>Поиск
          уязвимостей</b>!
        </p>
        <p>
          На данном сайте ты сможешь найти топ 10 уязвимостей по версии сайта <a
          href="https://owasp.org/www-project-top-ten/">OWASP</a>. Настоятельно рекомендую почитать про такие атаки
          как: <Code>XSS</Code>, <Code>RCE</Code>, <Code>CORS</Code>, <Code>SSRF</Code>, <Code>DDoS</Code>.
        </p>
        <p>
          Чтобы поиск уязвимостей не превратился в
          блуждание по сайту, предлагаю тебе попытаться заработать <b>достижения</b> 💪:
          <ul>
            <li>🙅🏾‍♂️ Hи ceбe ни людям — <i>сломай одну страницу с аукционом</i></li>
            <li>🥷 По следам Тома Клэнси — <i>ходят слухи, что в порту "Три топора" что-то есть</i></li>
            <li>🪙 I want more! — <i>Заполучи данные всех пользователей</i></li>
            <li>💉️ Новейшая вакцина замедленной усвояемости — <i>просто найди ей применение</i></li>
            <li>🍪️ Me want cookie! — <i>самое время украсть чужое печенье</i></li>
            <li>🕵🏻‍♂️️ Дедуктивный метод — <i>реквизиты к хранилищу видны, ошибки быть не может</i></li>
            <li>🔥️ Гори, гори ясно — <i>добейся отказа работы сервиса</i></li>

          </ul>
        </p>
        <p>
          Click the "Make me scroll" button below to make this overlay's content really tall, which
          will make the overlay's container (but not the page) scrollable
        </p>
        <br/>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button intent={Intent.DANGER} onClick={handleClose} style={{margin: ''}}>
            Ясно, понятно
          </Button>
        </div>
      </Card>
    </Overlay>
  </>
}

export default Instruction

function classNames(CARD: any, ELEVATION_4: any, OVERLAY_EXAMPLE_CLASS: any, themeName: any, arg4:
  {
    [x
      :
      number
      ]:
      any
  }
) {
  throw new Error('Function not implemented.')
}

function OVERLAY_EXAMPLE_CLASS(CARD: string, ELEVATION_4: string, OVERLAY_EXAMPLE_CLASS: any, themeName: any, arg4:
  {
    [x
      :
      number
      ]:
      any
  }
) {
  throw new Error('Function not implemented.')
}

