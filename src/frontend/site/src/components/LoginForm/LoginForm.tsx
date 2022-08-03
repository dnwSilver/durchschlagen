import { Button, Card, Elevation, FormGroup, InputGroup } from "@blueprintjs/core"
import { useState } from "react";
import styles from './LoginForm.module.css'

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)

    return <>
        <Card className={styles.login} elevation={Elevation.TWO}>
            <h1>Create account</h1>
            <FormGroup
                label="Login"
                labelFor="text-input"
                labelInfo="(required)">
                <InputGroup id="text-input" placeholder="bran@gmail.com" />
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
            <Button className="bp3-intent-primary">Submit</Button>
        </Card>
    </>
}

export default LoginForm