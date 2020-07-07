import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap';

function RenderDish({dish}) {
    return (
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>
                    {dish.description}
                </CardText>
            </CardBody>
        </Card>
    );
}

function RenderComments({comments}) {
    if(comments==null)
        return <div></div>;
    else {       
        const temp = comments.map((comment) => {
            return (
                <div key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year:'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </div>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <div>
                    {temp}
                </div>
            </div>
        );
    }
}

function DishDetail(props) {
    if(props.dish !=null ) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.dish.comments} />
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;