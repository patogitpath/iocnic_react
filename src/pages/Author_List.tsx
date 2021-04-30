import React, { Component } from "react";
import { createOutline, trash, add, infinite } from "ionicons/icons";
import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, withIonLifeCycle, useIonAlert, IonAlert, IonGrid, IonRow, IonCol, Animation, CreateAnimation } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Author_List.css';
import axios from "axios";
import links from "../services/links";
import { Link } from "react-router-dom";

export class AuthorList extends Component {

    state = {
        listAuthor: [],
        alertState: false,
        alertStateBook: false,
        authorId: null,
        bookId: null,
        positionBookArray: null,
        disabledAccordion: [],
        animateDiv: {
            enabled: false,
            status: true,
            props: {
                property: 'height',
                fromValue: '0px',
                toValue:'50px'
            }
        },
        estadio: false
    };

    async ionViewWillEnter() {


        try {
            
            let listAuthorComplete: any[] = [];
            const data = await axios.post(links.getAllAuthor, {});
            const arrayAuthor: any[] = data.data.d;
            let disabledArray: any[] = [];
            arrayAuthor.map(async (author, i) => {
                listAuthorComplete.push({ 
                    authorList: author.author,
                    books: author.bookList
                });
                disabledArray.push({ enabled: false });
            });

            this.setState({
                listAuthor: listAuthorComplete,
                disabledAccordion: disabledArray
            });


        } catch (error) {
            console.log(error);
        }
    }

    async deleteAuthor(id: any) {

        try {
            
            const deleteData = {
                "id": id
            };

            const data = await axios.post(links.deleteAuthor, deleteData);
            console.log(data);
            this.setState({
                listAuthor: this.state.listAuthor.filter((a,i) => {
                    return a["authorList"]["id"] !== id
                })                
            });
        } catch (error) {
            console.log(error);
        }

    }

    async deleteBook(id: any, position: any) {
        

        try {
            
            const data = await axios.post(links.deleteBook, { id: id });
            console.log(data);
            let bookArray: any[] = this.state.listAuthor[position]["books"];
            bookArray = bookArray.filter((b, i) => {
                return b.id !== id;
            });
            let authorList: any[] = this.state.listAuthor;
            authorList[position].books = bookArray;
            this.setState({
                listAuthor: authorList
            });

        } catch (error) {
            console.log(error);
        }

    }

    accordionView(index: any) {
        let disabledArray: any[] = this.state.disabledAccordion;
        disabledArray[index]["enabled"] = !this.state.disabledAccordion[index]["enabled"];
        this.setState({
            disabledAccordion: disabledArray
        });
    }

    render() {

        const alertas = (
            <>
            <IonAlert
                isOpen={ this.state.alertStateBook }
                cssClass="my-custom-class"
                header="Eliminar"
                message="Desea eliminar el libro"
                buttons={[
                    {
                        text: "cancel",
                        role: "Cancel",
                        handler: (blah) => {
                            this.setState({
                                alertStateBook: false
                            });
                        }
                    }, {
                        text: "Ok",
                        handler: () => {
                            this.deleteBook(this.state.bookId, this.state.positionBookArray);
                            this.setState({
                                alertStateBook: false
                            });
                        }
                    }
                ]}
            ></IonAlert>
            <IonAlert
                isOpen={ this.state.alertState }
                cssClass= "my-custom-class"
                header="Eliminar"
                message="Desea eliminar el autor"
                buttons={[
                    {
                        text: "cancel",
                        role: "Cancel",
                        handler: (blah) => {
                            this.setState({
                                alertState: false
                            });
                        }
                    },
                    {
                        text: "Ok",
                        handler: () => {
                            this.deleteAuthor(this.state.authorId);
                            this.setState({
                                alertState: false
                            });
                        }
                    }
                ]}
            ></IonAlert>
            </>
        );

        const authotRender = this.state.listAuthor.map((a, i) => {
            let booksList: any[] = a["books"];
            return(
                <IonRow key={i}>
                    <IonCol size="12">
                        <IonItem onClick={() => { this.accordionView(i) }}>
                            <IonAvatar slot="start">
                                <img src="https://previews.123rf.com/images/indomercy/indomercy1701/indomercy170100075/68564332-creative-author-icon-color.jpg" alt="image" />
                            </IonAvatar>
                            <IonLabel>
                                <h2>{a["authorList"]["name"]}</h2>
                                <h3>{a["authorList"]["apellido"]}</h3>
                                <p>{a["authorList"]["edad"]}</p>
                            </IonLabel>
                            <IonButtons slot="end">
                                <Link to={"/edith-author/" + a["authorList"]["id"]} color="success">
                                    <IonButton fill="clear" color="success">
                                    <IonIcon icon={createOutline}></IonIcon>    
                                    </IonButton>
                                </Link>
                                <IonButton fill="clear" color="danger" onClick={() => { this.setState({alertState: true, authorId: a["authorList"]["id"]}) }}>
                                    <IonIcon icon={trash}></IonIcon>
                                </IonButton>
                            </IonButtons>
                        </IonItem>
                    </IonCol>
                    { this.state.disabledAccordion[i]["enabled"] ? (
                    <IonCol size="12">
                        { booksList.map((book, index) => (
                        <IonItem key={index} color="light" lines="none">
                            <IonAvatar slot="start">
                                <img src="https://cdn.dribbble.com/users/201599/screenshots/1545461/book.jpg?compress=1&resize=400x300" alt="imagebook" />
                            </IonAvatar>
                            <IonLabel>
                                <h2>{ book.name }</h2>
                                <h3>{ book.description }</h3>
                            </IonLabel>
                            <IonButtons slot="end">
                                <Link to={"/edith-book/" + book.id }>
                                    <IonButton color="success" fill="clear">
                                        <IonIcon icon={createOutline}></IonIcon>
                                    </IonButton>
                                </Link>
                                <IonButton color="danger" fill="clear" onClick={ () => { this.setState({ alertStateBook: true, bookId: book.id, positionBookArray: i }) } }>
                                    <IonIcon icon={trash}></IonIcon>
                                </IonButton>
                            </IonButtons>
                        </IonItem>)) }
                        <IonItem color="light">
                            <Link to={"/newbook/" + a["authorList"]["id"] } className="center-content">
                                <IonButton shape="round" fill="outline" color="secondary">
                                    <IonIcon icon={add}></IonIcon>
                                </IonButton>
                            </Link>
                        </IonItem>
                    </IonCol>
                    ) : '' }
                </IonRow>
            );
        });

        return(
            <IonPage>
                <IonHeader color="primary">
                    <IonToolbar color="primary">
                        <IonTitle>Autores</IonTitle>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {alertas}
                    <IonList>
                        <IonGrid className="ion-no-padding">
                        <IonButton color="primary" onClick={() => {
                            let propsAnimated: any = this.state.animateDiv.status ? { property: 'height', fromValue: '0px', toValue:'50px' } : { property: 'height', fromValue: '50px', toValue:'0px' };
                            console.log(this.state.animateDiv.status);
                            console.log(propsAnimated);
                            this.setState({
                                animateDiv: {
                                    enabled: !this.state.animateDiv.enabled,
                                    status: !this.state.animateDiv.status,
                                    props: propsAnimated
                                }
                            });
                        }}>animate</IonButton>
                        <CreateAnimation 
                            duration={500}
                            fromTo={[ this.state.animateDiv.props ]}
                            easing="ease-out"
                            play={ this.state.animateDiv.enabled }
                        >
                            <div className="box">
                                <h3>mensaje box</h3>
                            </div>
                        </CreateAnimation>
                        {authotRender}
                        </IonGrid>
                    </IonList>
                </IonContent>
            </IonPage>
        );

    }
    
}

export default withIonLifeCycle(AuthorList);