import React from 'react';
import {useSSlack} from "../../context/slackContext";
import {useForm} from "react-hook-form";
import {Button, Card, Textarea, Label, Message} from "../ui";
import {zodResolver} from "@hookform/resolvers/zod";
import {BiMessageDetail} from "react-icons/bi";
import {messageSleckschema} from "../../schemas/slackSchema.js";

function SlackComunity(props) {

    const {
        register,
        handleSubmit,

        formState: {errors},
    } = useForm({
       resolver: zodResolver(messageSleckschema),
    });
    const {slackFromcontext,nachricht,setNachricht,setMessage} = useSSlack();





    const onSubmit1 = async (message) => {
        console.log('submit', message);
await slackFromcontext(message)
        setMessage('')
        //setNachricht('Message was sent to your class')
    };


    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">

                <div>
                    <Card>

                        {nachricht}
                        <h1 className="text-2xl font-bold flex items-center"><BiMessageDetail className="text-4xl mb-2 mr-2"/>Contact your class via Slack</h1>
                        <p className="text-sm mb-9">

                        </p>

                        <form onSubmit={handleSubmit(onSubmit1)}>


                            <Label htmlFor="message">Message:</Label>
                            <Textarea
                                label="Write your email"
                                type="text"
                                name="message"
                                placeholder="text for your class"
                                {...register("message", {required: true})}
                            />
                            <p>{errors.slackmessage?.message}</p>

                            <Button>Send message</Button>

                        </form>

                    </Card>
                </div>

        </div>
    );
}

export default SlackComunity;