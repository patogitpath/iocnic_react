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
        scrollList: [],
        alertState: false,
        alertStateBook: false,
        authorId: null,
        bookId: null,
        positionBookArray: null,
        disabledAccordion: [],
        direction: 'normal',
        animateDiv: {
            enabled: false,
            status: false,
            props: { property: 'height', fromValue: '0px', toValue:'50px' }
        },
        onFinish: { callback: () => {
            this.setState({
                animateDiv: {
                    enabled: false,
                    status: this.state.animateDiv.status,
                    props: {}
                }
            });            
        }},
        onFinishArray: [],
        onFinishArrayAuthorList: [],
        estadio: false
    };

    async ionViewWillEnter() {


        try {
            
            let listAuthorComplete: any[] = [];
            const data = await axios.post(links.getAllAuthor, {});
            const arrayAuthor: any[] = data.data.d;
            let disabledArray: any[] = [];
            let scroList: any[] = [];
            let onFinishArrayAnimated: any[] = [];
            let onFinishArrayAnimatedListAuthor: any[] = [];
            arrayAuthor.map(async (author, i) => {
                listAuthorComplete.push({ 
                    authorList: author.author,
                    books: author.bookList,
                    animated: {
                        enabled: false,
                        status: false,
                        props: { property: 'height', fromValue: '0px', toValue:'64px' }
                    }
                });
                scroList.push({
                    author: author.author,
                    animated: {
                        enabled: false,
                        status: false,
                        props: { property: 'height', fromValue: '0px', toValue:'70px' }
                    }
                });
                onFinishArrayAnimated.push({ callback: () => {

                    let objectAnimatedPosition: any = {
                        author: this.state.scrollList[i]["author"],
                        animated: {
                            enabled: false,
                            status: this.state.scrollList[i]["animated"]["status"],
                            props: {}
                        }
                    };

                    let srollList: any[] = this.state.scrollList;
                    srollList[i] = objectAnimatedPosition;
                    this.setState({
                        scrollList: srollList
                    });
                }});
                onFinishArrayAnimatedListAuthor.push({ callback: () => {

                    let objectAnimatedPosition: any = {
                        authorList: this.state.listAuthor[i]["authorList"],
                        books: this.state.listAuthor[i]["books"],
                        animated: {
                            enabled: false,
                            status: this.state.listAuthor[i]["animated"]["status"],
                            props: {}
                        }
                    };
            
                    let srollList: any[] = this.state.listAuthor;
                    srollList[i] = objectAnimatedPosition;
                    this.setState({
                        listAuthor: srollList
                    });

                }});
                disabledArray.push({ enabled: false });
            });

            this.setState({
                listAuthor: listAuthorComplete,
                disabledAccordion: disabledArray,
                scrollList: scroList,
                onFinishArray: onFinishArrayAnimated,
                onFinishArrayAuthorList: onFinishArrayAnimatedListAuthor
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

            const data = await axios.post(links.deleteCompleteAuthor, deleteData);
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

    playAnimation(index: any) {

        let objectAnimatedPosition: any = {
            author: this.state.scrollList[index]["author"],
            animated: {
                enabled: true,
                status: !this.state.scrollList[index]["animated"]["status"],
                props: {}
            }
        };

        let srollList: any[] = this.state.scrollList;
        srollList[index] = objectAnimatedPosition;
        this.setState({
            scrollList: srollList
        });
    }

    playAnimationAuthorList(index: any) {
        
        let objectAnimatedPosition: any = {
            authorList: this.state.listAuthor[index]["authorList"],
            books: this.state.listAuthor[index]["books"],
            animated: {
                enabled: true,
                status: !this.state.listAuthor[index]["animated"]["status"],
                props: {}
            }
        };

        let srollList: any[] = this.state.listAuthor;
        srollList[index] = objectAnimatedPosition;
        this.setState({
            listAuthor: srollList
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
        
        const scrollLista = this.state.scrollList.map((author, index) => {
            return(
                <IonRow key={index}>
                    <IonCol size="12">
                        <IonItem onClick={() => { this.playAnimation(index) }}>
                            <IonAvatar slot="start">
                                <img src="https://previews.123rf.com/images/indomercy/indomercy1701/indomercy170100075/68564332-creative-author-icon-color.jpg" alt="image" />
                            </IonAvatar>
                            <IonLabel>
                                <h2>{ author["author"]["name"] }</h2>
                                <h3>{ author["author"]["apellido"] }</h3>
                                <p>{ author["author"]["edad"] }</p>
                            </IonLabel>
                        </IonItem>
                    </IonCol>
                    <IonCol size="12">
                        <CreateAnimation
                            duration={ 300 }
                            fromTo={ author["animated"]["props"] }
                            direction={ author["animated"]["status"] ? "normal" : "reverse" }
                            easing="ease-out"
                            play={ author["animated"]["enabled"] }
                            onFinish={ this.state.onFinishArray[index] }
                        >   
                            <div className="box">
                                <IonItem lines="none">
                                    <IonAvatar slot="start">
                                        <img src="https://cdn.dribbble.com/users/201599/screenshots/1545461/book.jpg?compress=1&resize=400x300" alt="imagebook" />
                                    </IonAvatar>
                                    <IonLabel>
                                        <h2>book 1</h2>
                                        <h3>description book</h3>
                                    </IonLabel>
                                </IonItem>
                            </div>
                            <div className="box">
                                <IonItem lines="none">
                                    <IonAvatar slot="start">
                                        <img src="https://cdn.dribbble.com/users/201599/screenshots/1545461/book.jpg?compress=1&resize=400x300" alt="imagebook" />
                                    </IonAvatar>
                                    <IonLabel>
                                        <h2>book 1</h2>
                                        <h3>description book</h3>
                                    </IonLabel>
                                </IonItem>
                            </div>
                            <div className="box">
                                <IonItem lines="none">
                                    <IonAvatar slot="start">
                                        <img src="https://cdn.dribbble.com/users/201599/screenshots/1545461/book.jpg?compress=1&resize=400x300" alt="imagebook" />
                                    </IonAvatar>
                                    <IonLabel>
                                        <h2>book 1</h2>
                                        <h3>description book</h3>
                                    </IonLabel>
                                </IonItem>
                            </div>
                        </CreateAnimation>
                    </IonCol>
                </IonRow>
            )
        });

        const authotRender = this.state.listAuthor.map((a, i) => {
            let booksList: any[] = a["books"];
            return(
                <IonRow key={i}>
                    <IonCol size="12">
                        <IonItem onClick={() => { this.playAnimationAuthorList(i) }}>
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
                    <IonCol size="12">
                            { booksList.map((book, index) => {
                            return(
                            <CreateAnimation
                                key={index}
                                duration={ 300 }
                                fromTo={ a["animated"]["props"] }
                                direction={ a["animated"]["status"] ? "normal" : "reverse" }
                                easing="ease-out"
                                play={ a["animated"]["enabled"] }
                                onFinish={ this.state.onFinishArrayAuthorList[i] }
                            >
                                <IonItem className="box" color="light" lines="none">
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
                                </IonItem>
                            </CreateAnimation>
                            )}) }
                             <CreateAnimation
                                duration={ 300 }
                                fromTo={ a["animated"]["props"] }
                                direction={ a["animated"]["status"] ? "normal" : "reverse" }
                                easing="ease-out"
                                play={ a["animated"]["enabled"] }
                                onFinish={ this.state.onFinishArrayAuthorList[i] }
                            >
                                <IonItem color="light" className="box" lines="none">
                                    <Link to={"/newbook/" + a["authorList"]["id"] } className="center-content">
                                        <IonButton shape="round" fill="outline" color="secondary">
                                            <IonIcon icon={add}></IonIcon>
                                        </IonButton>
                                    </Link>
                                </IonItem>
                            </CreateAnimation>
                    </IonCol>
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
                        {authotRender}
                        </IonGrid>
                        <IonGrid className="ion-no-padding">
                        {/* scrollLista */}
                        </IonGrid>
                    </IonList>
                    {/*<IonButton color="primary" onClick={() => {
                            this.setState({
                                animateDiv: {
                                    enabled: true,
                                    status: !this.state.animateDiv.status,
                                    props: {}
                                }
                            });
                        }}>animate</IonButton>
                        <CreateAnimation 
                            duration={500}
                            fromTo={ this.state.animateDiv.props }
                            direction={ this.state.animateDiv.status ? "normal" : "reverse" }
                            easing="ease-out"
                            onFinish={ this.state.onFinish }
                            play={ this.state.animateDiv.enabled }
                        >
                            <div className="box">
                                <h3>mensaje box</h3>
                            </div>
                    </CreateAnimation>*/}
                </IonContent>
            </IonPage>
        );

    }
    
}

export default withIonLifeCycle(AuthorList);