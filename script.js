// Floating elements
document.querySelectorAll('.hero').forEach(hero => {
    for(let i=0;i<15;i++){
        const circle=document.createElement('div');
        circle.classList.add('background-circle');
        const size=Math.random()*60+20;
        circle.style.width=`${size}px`;
        circle.style.height=`${size}px`;
        circle.style.left=`${Math.random()*100}%`;
        circle.style.animationDuration=`${Math.random()*5+4}s`;
        circle.style.animationDelay=`${Math.random()*5}s`;
        hero.appendChild(circle);
    }
    for(let i=0;i<10;i++){
        const star=document.createElement('div');
        star.classList.add('wiggly-star');
        star.style.top=`${Math.random()*60}%`;
        star.style.left=`${Math.random()*100}%`;
        star.style.animationDuration=`${Math.random()*3+2}s`;
        hero.appendChild(star);
    }
    for(let i=0;i<10;i++){
        const shape=document.createElement('div');
        shape.classList.add('floating-shape');
        const size=Math.random()*20+10;
        shape.style.width=`${size}px`;
        shape.style.height=`${size}px`;
        shape.style.left=`${Math.random()*100}%`;
        shape.style.animationDuration=`${Math.random()*5+3}s`;
        hero.appendChild(shape);
    }
    for(let i=0;i<20;i++){
        const confetti=document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left=`${Math.random()*100}%`;
        confetti.style.animationDelay=`${Math.random()*5}s`;
        confetti.style.width=`${Math.random()*10+5}px`;
        confetti.style.height=`${Math.random()*15+5}px`;
        hero.appendChild(confetti);
    }
});

// Cart system
let cart = [];
const cartDiv=document.createElement('div');
cartDiv.id='cart';
cartDiv.innerHTML=`<h3>Cart</h3><div id="cart-items"></div><div class="cart-total">Total: R0</div>`;
document.body.appendChild(cartDiv);

function updateCart(){
    const cartItems=document.getElementById('cart-items');
    cartItems.innerHTML='';
    let total=0;
    cart.forEach(item=>{
        total+=item.price;
        const div=document.createElement('div');
        div.classList.add('cart-item');
        div.textContent=`${item.name} R${item.price}`;
        cartItems.appendChild(div);
    });
    cartDiv.querySelector('.cart-total').textContent=`Total: R${total}`;
}

document.querySelectorAll('.add-cart-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
        const name=btn.dataset.name;
        const price=parseInt(btn.dataset.price);
        cart.push({name,price});
        updateCart();
    });
});

// Optional: subtle hover animation for gallery images
document.querySelectorAll('.gallery-grid img').forEach(img=>{
    img.addEventListener('mouseenter', ()=>{ img.style.transform='scale(1.12) rotate(1deg)'; });
    img.addEventListener('mouseleave', ()=>{ img.style.transform='scale(1) rotate(0deg)'; });
});

// Add cartoon people to hero section
document.querySelectorAll('.hero').forEach(hero => {
    const hairPerson = document.createElement('img');
    hairPerson.src = 'cartoon-hair.png';
    hairPerson.classList.add('cartoon-person','cartoon-hair');
    hero.appendChild(hairPerson);

    const nailsPerson = document.createElement('img');
    nailsPerson.src = 'cartoon-nails.png';
    nailsPerson.classList.add('cartoon-person','cartoon-nails');
    hero.appendChild(nailsPerson);

    const skincarePerson = document.createElement('img');
    skincarePerson.src = 'cartoon-skincare.png';
    skincarePerson.classList.add('cartoon-person','cartoon-skincare');
    hero.appendChild(skincarePerson);
});

// Sparkle effect on hover
function createSparkle(parent) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = `${Math.random() * parent.offsetWidth}px`;
    sparkle.style.top = `${Math.random() * parent.offsetHeight}px`;
    parent.appendChild(sparkle);
    setTimeout(()=>{ sparkle.remove(); }, 800); // remove after animation
}

// Sparkle on company name
document.querySelectorAll('.company-name, .book-btn, .add-cart-btn').forEach(elem=>{
    elem.addEventListener('mouseenter', ()=>{
        for(let i=0;i<5;i++){
            createSparkle(elem);
        }
    });
});

// Generate moving pink circles in hero section
const hero = document.querySelector('.hero');
for(let i=0;i<8;i++){
    const circle = document.createElement('div');
    circle.classList.add('floating-circle');
    const size = Math.random()*40 + 20; // 20px to 60px
    circle.style.width = size+'px';
    circle.style.height = size+'px';
    circle.style.top = Math.random()*hero.offsetHeight+'px';
    circle.style.left = Math.random()*hero.offsetWidth+'px';
    circle.style.animationDuration = (Math.random()*4+4)+'s'; // 4s to 8s
    hero.appendChild(circle);
}

// Toggle chat widget
const chatToggle = document.getElementById('ai-chat-toggle');
const chatWidget = document.getElementById('ai-chat-widget');
chatToggle.addEventListener('click', ()=>{ 
    chatWidget.style.display = (chatWidget.style.display==='flex')?'none':'flex';
});

// Simple AI Q&A
const chatMessages = document.getElementById('ai-chat-messages');
const chatInput = document.getElementById('ai-chat-input');

const answers = {
    "hello":"Hello! How can I help you today?",
    "what services":"We offer Hair, Nails, Frontal Hair, and Skin Care products.",
    "how to book":"Click on the 'Book Appointment' button and fill out the form.",
    "price":"You can see all prices in our products section, in Rands (R).",
    "hours":"We are open Monday to Saturday, 8am to 6pm."
};

chatInput.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        const userText = chatInput.value.trim();
        if(!userText) return;
        const userMsg = document.createElement('div'); userMsg.classList.add('ai-message','ai-user');
        userMsg.textContent = userText; chatMessages.appendChild(userMsg);
        chatInput.value='';

        const lowerText = userText.toLowerCase();
        let reply = "Sorry, I didn't understand. Please ask something else!";
        for(let key in answers){ if(lowerText.includes(key)) reply=answers[key]; }

        const botMsg = document.createElement('div'); botMsg.classList.add('ai-message','ai-bot');
        botMsg.textContent = reply; chatMessages.appendChild(botMsg);

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

// Highlight today's working day
const days = document.querySelectorAll('.salon-hours .day');
const todayIndex = new Date().getDay(); // Sunday = 0, Monday = 1
if(todayIndex > 0 && todayIndex < 7){ // Ignore Sunday (closed)
    days[todayIndex-1].style.backgroundColor = '#ff1493';
    days[todayIndex-1].style.color = 'white';
}