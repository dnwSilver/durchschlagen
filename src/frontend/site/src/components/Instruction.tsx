import {Button, Callout, Card, Classes, Code, Elevation, H3, Intent, OL, Overlay, UL} from '@blueprintjs/core'
import {useEffect, useState}                                                          from 'react'
import {useLocalStorage}                                                              from '../hooks/useLocalStorage'

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
    <Overlay onClose={handleClose}
             autoFocus={false}
             usePortal
             enforceFocus={false}
             isOpen={isOpen}
             hasBackdrop
             transitionDuration={200}
             transitionName={Classes.OVERLAY}
             className={Classes.OVERLAY_SCROLL_CONTAINER}>
      <Card className="docs-overlay-example-transition bp4-overlay-content bp4-overlay-enter-done"
            style={{width: '60%', top: '10%', left: '20%'}} elevation={Elevation.FOUR}>
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
          <UL>
            <OL>🙅🏾‍♂️ <b>Hи ceбe ни людям</b> — <i>сломай один аукцион</i></OL>
            <OL>🥷 <b>По следам Тома Клэнси</b> — <i>ходят слухи, что в порту "Три топора" что-то есть</i></OL>
            <OL>🪙 <b>I want more!</b> — <i>Заполучи данные всех пользователей</i></OL>
            <OL>💉️ <b>Новейшая вакцина замедленной усвояемости</b> — <i>просто найди ей применение</i></OL>
            <OL>🍪️ <b>Me want cookie!</b> — <i>самое время украсть чужое печенье</i></OL>
            <OL>🕵🏻‍♂️️ <b>Дедуктивный метод</b> — <i>реквизиты к хранилищу видны, ошибки быть не может</i></OL>
            <OL>🔥️ <b>Гори, гори ясно</b> — <i>добейся отказа работы сервиса</i></OL>
            <OL>🤦🏼 <b>Как достать соседа?</b> — <i>создай аукцион за другого пользователя</i></OL>
          </UL>
        </p>
        <Callout intent="primary" title="Что делать если что-то сдохло?">
          В случае ошибок или факапов можно писать в <a href="https://t.me/+79089079140">telegram</a> или звонить по
          номеру <a href="tel:79089079140">+7 (908) 907-91-40</a>.
        </Callout>
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

