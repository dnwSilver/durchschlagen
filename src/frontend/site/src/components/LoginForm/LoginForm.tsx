import {Button, Card, Elevation, FormGroup, InputGroup, Intent} from "@blueprintjs/core"
import {ChangeEvent, ChangeEventHandler, useState} from "react";
import styles from './LoginForm.module.css'

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [loginIntent, setLoginIntent] = useState<Intent>()
    const [login, setLogin] = useState<string>()

    const handleSubmitForm = () => {
        setLoginIntent(!login ? "danger" : undefined)
    }

    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value)
        setLoginIntent(undefined)
    }

    return <>
        <Card className={styles.login} elevation={Elevation.TWO}>
            <h1>Create account</h1>
            <FormGroup
                label="Login"
                labelFor="text-input"
                labelInfo="(required)"
            >
                <InputGroup intent={loginIntent}
                            id="text-input"
                            placeholder="bran@gmail.com"
                            onChange={handleLoginChange}
                            value={login}/>
            </FormGroup>
            <FormGroup
                label="Password"
                labelFor="text-input"
                labelInfo="(required)">
                <InputGroup
                    placeholder="Enter your password..."
                    type={showPassword ? "text" : "password"}
                    rightElement={
                        <Button
                            icon={showPassword ? "unlock" : "lock"}
                            intent="warning"
                            minimal={true}
                            onClick={() => setShowPassword(!showPassword)}
                        />}
                />
            </FormGroup>
            <Button className="bp3-intent-primary" onClick={handleSubmitForm}>Submit</Button>
        </Card>
    </>
}

export default LoginForm
