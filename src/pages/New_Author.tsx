import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { Component } from "react";

export class NewAuthor extends Component {

    state = {
        name: '',
        apellido: '',
        edad: 0
    };


    componentDidMount() {


    }

    changeText(e: any) {
        console.log("mensaje");
        const {name, value} = e.target;
        this.setState({[name]: value});

    }

    submitForm(e: any) {
        console.log("mensajes");
        console.log(this.state);
    }

    render() {
        return(
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>New Author</IonTitle>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref={"/"}></IonBackButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <form>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonItem className="ion-margin-bottom">
                                        <IonLabel position="stacked">Name</IonLabel>
                                        <IonInput type="text" name="name" placeholder="name" onIonChange={this.changeText.bind(this)}></IonInput>
                                    </IonItem>
                                    <IonItem className="ion-margin-bottom">
                                        <IonLabel position="stacked">Apellido</IonLabel>
                                        <IonInput type="text" name="apellido" placeholder="apellido" onIonChange={this.changeText.bind(this)}></IonInput>
                                    </IonItem>
                                    <IonItem className="ion-margin-bottom">
                                        <IonLabel position="stacked">Edad</IonLabel>
                                        <IonInput type="number" name="edad" placeholder="edad" onIonChange={this.changeText.bind(this)}></IonInput>
                                    </IonItem>
                                    <IonButton expand="block" color="primary" onClick={this.submitForm.bind(this)}>Save</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </form>
                </IonContent>
            </IonPage>
        );
    }
}

export default NewAuthor;