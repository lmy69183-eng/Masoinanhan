
document.addEventListener('DOMContentLoaded', () => {
    // 0. Khởi tạo âm thanh tương tác
    const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'); // Tiếng click nút
    const wolfSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2908/2908-preview.mp3'); // Tiếng sói hú
    clickSound.volume = 0.4;
    wolfSound.volume = 0.5;

    function playSound(audioObj) {
        audioObj.currentTime = 0;
        audioObj.play().catch(e => console.log("Trình duyệt chặn autoplay:", e));
    }

    // Gắn âm thanh click cho mọi nút bấm và mục menu trên trang
    document.querySelectorAll('button, .menu-item, .btn-start, .btn-back-home, .btn-back').forEach(el => {
        el.addEventListener('click', () => {
            playSound(clickSound);
        });
    });

    // 1. Tạo hiệu ứng chòm sao và hạt sáng xuất hiện ngay lập tức
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        const stars = [];
        const numStars = 18;
        
        // Tạo các ngôi sao cố định/lấp lánh
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'constellation-star';
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const size = Math.random() * 2.5 + 2;
            
            star.style.left = `${x}px`;
            star.style.top = `${y}px`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            
            particleContainer.appendChild(star);
            stars.push({ x, y });
        }

        // Nối các ngôi sao gần nhau thành các đường chòm sao
        for (let i = 0; i < stars.length; i++) {
            for (let j = i + 1; j < stars.length; j++) {
                const dist = Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y);
                if (dist < 130) {
                    const line = document.createElement('div');
                    line.className = 'constellation-line';
                    line.style.left = `${stars[i].x}px`;
                    line.style.top = `${stars[i].y}px`;
                    line.style.width = `${dist}px`;
                    const angle = Math.atan2(stars[j].y - stars[i].y, stars[j].x - stars[i].x) * (180 / Math.PI);
                    line.style.transform = `rotate(${angle}deg)`;
                    particleContainer.appendChild(line);
                    break;
                }
            }
        }
    }

    // 2. Chuyển đổi qua lại giữa các màn hình & Nút Trang Chủ
    const startBtn = document.getElementById('start-btn');
    const backHomeBtn = document.getElementById('back-home-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const menuScreen = document.getElementById('menu-screen');
    const contentScreen = document.getElementById('content-screen');

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            playSound(wolfSound); // Phát tiếng sói hú khi bấm bắt đầu
            welcomeScreen.classList.remove('active');
            menuScreen.classList.add('active');
        });
    }

    if (backHomeBtn) {
        backHomeBtn.addEventListener('click', () => {
            menuScreen.classList.remove('active');
            welcomeScreen.classList.add('active');
        });
    }

    // 3. Cơ sở dữ liệu nội dung chi tiết đầy đủ 100% không rút gọn
    const dbContent = {
        'intro-content': {
            title: 'Giới Thiệu Box',
            html: `<h3>Về Nanh Ẩn</h3><p>Nanh Ẩn là không gian dành cho những ai đam mê trò chơi Ma Sói (Werewolf/Mafia), nơi trí tuệ, sự phán đoán và nghệ thuật ngụy trang lên ngôi.</p><p>Box được thiết kế để cung cấp trọn bộ tài liệu, luật chơi chuẩn mực và các chiến thuật sinh tồn đỉnh cao.</p>`
        },
        'rules-content': {
            title: 'Luật Chung Nanh Ẩn',
            html: `
                <div style="background: rgba(255, 215, 0, 0.1); border: 1px solid #ffd700; padding: 12px; border-radius: 6px; margin-bottom: 15px; color: #fff1ca;">
                    <p style="margin-bottom: 8px;">⚠️ <b>Lưu ý:</b> Cả 3 Phe đều không được phép hint chức năng ở sáng ngày đầu tiên. Bắt đầu từ sáng 2, có quyền chọn cạch hoặc đưa ra hint (gợi ý) về char của bản thân.</p>
                    <p style="margin-bottom: 0;">⚠️ <b>Lưu ý:</b> Bắt đầu từ sáng ngày thứ 2, không được phép để Vote Trắng.</p>
                </div>

                <h3>LUẬT CHUNG</h3>
                <p><b>1.</b> Hạn chế teencode, viết tắt khi chơi game.</p>
                <p><b>2.</b> Khi chơi game lẫn tương tác hằng ngày ở box chung. Tôn trọng lẫn nhau và dùng từ ngữ lịch sự, không joke 18+, đùa có chừng mực.</p>
                <p><b>3.</b> Fair Play với tất cả các trò chơi. Thắng thua đều là người Làng mình, kết ván hãy thoát vai, không vì trong trò chơi khác phe mà tạo ra hậu tranh cãi.</p>
                <p><b>4.</b> Trong lúc chơi Ma Sói và luận. Người chơi không được phép cap tin nhắn với quản trò gửi vào Làng cho đến khi kết thúc ván game. Để chứng minh bản thân, bạn chỉ có quyền chuyển tiếp tin nhắn hoặc copy câu hỏi của "Hoàng Hậu" gửi vào Làng.</p>
                <p><b>5.</b> Nếu đã chấm "." list, hãy có mặt ít nhất trước 10 phút so với thời gian ván game bắt đầu, để nhận char và đọc kĩ chức năng của bản thân. Muốn rút list hãy báo trước với quản.</p>
                <p><b>6.</b> Để ý hiệu lệnh của quản trò. Người sống chỉ luận buổi sáng, vào ban đêm người chết và các thành viên không tham gia ván game có thể thoải mái trò chuyện.</p>
                <p><b>7.</b> Người đã chết không được bàn luận về ván game và hint, cạch char cho đến khi ván game kết thúc.</p>
                <p><b>8.</b> Nghiêm cấm hint, cạch char vào sáng 1. Từ sáng 2 trở đi được quyền hint và cạch char. Bắt đầu từ sáng ngày 2 không được phép bỏ phiếu "Trắng".</p>
                <p><b>9.</b> Trường hợp vặt char: Không tham gia tranh luận từ 2 ngày, không vote (trừ char bị cấm vote), chủ động xin quản rút ván.</p>
                <p><b>10.</b> Lúc quản báo vote không được tiếp tục luận. Xin chất không quá 2 người cho 1 lần treo giàn. Từng người lên chất, không hội đồng bạn. Không tự vote bản thân.</p>
                <p><b>11.</b> Thời gian luận mỗi buổi sáng nằm trong tầm 15 đến 20 phút, nếu dân muốn xin thêm (5 phút), không cho thêm quá 2 lần.</p>
                <p><b>12.</b> Có hiểu lầm hay tranh cãi cuối ván hãy bình tĩnh ngồi lại giải quyết với nhau, hóa giải nút thắt. Không thiên vị, không bênh vực. Nanh Ấn cũng là một ngôi nhà chung, mong rằng các bạn sẽ cố gắng vì nó phát triển hơn.</p>
            `
        },
        'village-content': {
            title: 'Phe Dân [ 35 ]',
            html: `
                <h3>I. PHE DÂN\n[ 35 ]</h3>
                
                <p><b>─ DÂN THƯỜNG 🏕 :</b> đêm sẽ chìm vào giấc ngủ, sáng thức dậy tham gia suy luận và vote treo giàn.</p>
                <p>🏕 Dân làng không có chức năng.</p>

                <p><b>─ TIÊN TRI 🔮 :</b> Mỗi đêm thức dậy chọn soi 1 người chơi, quản sẽ thông báo người đó là Thiện - Ác - Không Rõ.</p>
                <p>🔮 Thiện: Phe dân.</p>
                <p>🔮 Ác: Phe Sói, Phe 3.</p>
                <p>🔮 Không Rõ:<br>
                Đối với những char bị giấu thân phận. ( sói già, kẻ phản bội, …)<br>
                Dân hóa sói. Phe 3 hóa dân.<br>
                Phe 3 bị hóa, kéo. ( couple, đồng phạm ).<br>
                Người bị Quản Ngục giam.</p>
                <p>⚠️ Tiên tri chỉ được biết Phe của người chơi, không biết được chức năng.</p>

                <p><b>– TIÊN TRI TẬP SỰ 🔮👶 :</b> Không có chức năng cho đến khi Tiên Tri bị giết chết. Vào đêm hôm sau, Tập Sự sẽ kế thừa vai trò của Tiên Tri và thu thập toàn bộ thông tin đã soi được trước đó.</p>
                <p>🔮 Nếu Tiên Tri được hồi sinh, vai trò của họ quay trở lại là Tiên Tri Tập Sự.</p>

                <p><b>– NHÀ NGOẠI CẢM ⏳️ :</b> Mỗi đêm thức dậy và chọn 1 người chơi. Nếu người được chọn đã giết ai trong đêm, Nhà Ngoại Cảm sẽ được thông báo. [ báo rõ số, vẫn báo nếu tác động nhưng không chết ]</p>
                <p>⏳️ Không chọn trùng 1 người chơi 2 đêm liên tiếp.</p>

                <p><b>─ PHÙ THỦY 🧙‍♀️ :</b> Nhân vật này sở hữu 2 bình thuốc, 1 bình dùng cứu người và 1 bình dùng để giết người. [ được phép dùng 2 bình 1 đêm ]</p>
                <p>🧙‍♂️ Bình sinh dùng để hồi sinh một người bị Sói cắn chết. ( Nếu người bị cắn đã được Vệ an toàn thì không cần báo cho Phù Thủy ).</p>
                <p>🧙 Bình tử dùng để giết một người mà phù thủy nghi ngờ là sói. ( người được Bảo Vệ khi bị phù ném bình vẫn sẽ chết. Bình Tử không tác dụng nếu người chơi được Thầy Tu và Lực Sĩ chọn [ Lực Sĩ chết thay ] ).</p>
                <p>🧙‍♀️ Phù thủy được quyền tự ném bình sinh vào bản thân để tự vệ.</p>

                <p><b>─ BẢO VỆ 🫂 :</b> Chọn một người bảo vệ mỗi đêm. Không được vệ 1 người liên tiếp 2 đêm. [ có quyền tự vệ ]</p>
                <p>🫂 Khiên của bảo vệ cản được sự sát thương của Sói, Thợ Săn, Rèn, Chiến Binh, Sát Thủ, Vampire,... ( Nếu bị Phù ném Tử, phe 3 hỏi, nả, Ngục bắn vẫn chết. )</p>

                <p><b>– NGƯỜI THẾ THÂN 👥️:</b> Nếu trong lượt bỏ phiếu có kết quả hòa, người bị chết cuối ngày hôm đó sẽ là Người Thế Thân.</p>
                <p>⚠️ Người Thế Thân phải cố hết sức để tránh các lượt vote bằng nhau.</p>

                <p><b>─ XẠ THỦ 🔫 :</b> Có hai viên đạn có thể chọn bắn ai đó bạn nghi ngờ vào ban đêm.</p>
                <p>🔫 Đạn của Xạ Thủ bắn không chết người đang được nhận Bảo Vệ. [ Vệ, Tu, Rèn, Ngục, Lực ( Lực Sĩ chết thay) ]</p>

                <p><b>─ THỢ SĂN 🏹:</b> Mỗi đêm, Thợ săn thức dậy và chọn 1 người chơi. Nếu Thợ săn chết, người được Thợ Săn lựa chọn cũng sẽ chết theo.</p>
                <p>🏹 Người được Thợ Săn chọn chết trong đêm, Thợ Săn sẽ không chết theo.</p>
                <p>🏹 Nếu Thợ săn bị treo cổ vào ban ngày, được quyền chọn 1 người để chết chung.</p>
                <p>⚠️ Người bị ghim vẫn sẽ chết cùng Thợ Săn khi được nhận bất cứ loại vệ nào.</p>

                <p><b>— THÁM TỬ 🕵‍♂️ :</b> Ban đêm thức dậy và được chọn 2 người chơi, Thám Tử sẽ biết được 2 người đấy có cùng phe với nhau hay không. [ 3 lần trong 1 ván game ]</p>
                <p>🕵‍♂️ Quản chỉ thông báo “cùng Phe” hoặc “khác Phe”. Không thông báo thông tin Phe cụ thể.</p>
                <p>🕵‍♂️ Được tự soi bản thân với người khác.</p>
                <p>⚠️ Mất tác dụng nếu chọn trúng người bị Quản Ngục giam.</p>

                <p><b>─ ẢO THUẬT GIA 🎭 :</b> đêm đầu tiên thức dậy tráo đổi Phe của 2 người chơi bất kì, khi Tiên Tri soi họ sẽ ra phe bị tráo. ( Bản thân chức năng của họ thì vẫn giữ nguyên, người bị tráo sẽ không được thông báo mình bị tráo. )</p>
                <p>🎭 Thuật tráo chỉ có hiệu nghiệm trong 2 đêm, sang đêm 3 chức vụ sẽ trở lại bình thường.</p>
                <p>🎭 Sau khi thuật tráo kết thúc Ảo Thuật Gia mới được tiếp tục thực hiện chức năng.</p>
                <p>⚠️ Việc lựa chọn đêm 1 không bị ảnh hưởng bởi mất chức năng.</p>

                <p><b>─ NGƯỜI PHÙ PHÉP 🪄 :</b> mỗi đêm chọn một người để làm phép, người được chọn sẽ bị câm vào ngày hôm sau và sang ngày tiếp theo mới được nói chuyện bình thường</p>
                <p>🪄 Nếu bị treo vẫn có thể lên biện. Được nhận chất.</p>
                <p>🪄 Được quyền Vote. Không được quyền chất người bị vote.</p>

                <p><b>– NGƯỜI MÚA RỐI 🪆 :</b> Một lần duy nhất trong suốt ván chơi, Người múa rối có thể chỉ định Động Sói ăn thịt một người.</p>
                <p>🪆 Người đó có thể là một người khác so với sự thống nhất ban đầu của Sói.</p>
                <p>🪆 Người múa rối có thể buộc Sói ăn thịt một Sói khác.</p>

                <p><b>─ TƯỢNG ĐÁ 🗿 :</b> Không thể bị giết ở đêm đầu, đêm 2 nếu chết sẽ kéo theo một người để hóa đá.</p>
                <p>🗿 Người hóa đá sẽ bị cấm chat lẫn cấm chức năng, cấm vote trong 1 ngày. Bắt đầu đêm thứ 3 mới được hóa giải.</p>

                <p><b>– HIỆP SĨ 🗡 :</b> Nếu bị sói cắn, Động Sói cắn Hiệp Sĩ sẽ bị thương một con bất kì và chỉ sống thêm được 1 ngày 1 đêm. [ Quản báo số lượng sói ( vd: 1,2,3 ), không báo số nhân, char sói chính xác để Hiệp Sĩ chọn. ]</p>

                <p><b>─ THỢ RÈN 🗡🛡 :</b> Mỗi đêm rèn một trong hai lựa chọn sau đó tặng [ ngay trong đêm rèn ] cho một người chơi bất kì, rèn xong hoàn tất sử dụng mới được rèn món tiếp theo [ lần rèn tiếp theo thực hiện vào đêm hôm sau được sử dụng ].<br>
                VD: đêm 1 tặng kiếm, đêm 1 dùng kiếm -> đêm 2 được rèn.<br>
                VD: đêm 1 tặng khiên - đêm 2 bể khiên -> đêm 3 được rèn.<br>
                VD: đêm 1 tặng khiên - cả ván khiên không bể -> rèn không được rèn đến hết ván.</p>
                <p>🗡 Kiếm: giúp người chơi giết một người bất kì kể cả phe 3.</p>
                <p>🛡 Khiên: giúp người chơi đỡ được một đòn tấn công. ( bị Phù ném Tử, phe 3 hỏi, treo giàn vẫn sẽ chết. )</p>

                <p><b>─ CHIẾN BINH ⚔️ :</b> Có hai thanh kiếm, kiếm đỏ và kiếm xanh.</p>
                <p>⚔️ Kiếm đỏ:<br>
                Đâm trúng sói hoặc phe 3 sẽ chết ngay lập tức ( Trừ người được Bảo Vệ vệ và Thầy Tu vệ bất tử ).<br>
                Đâm trúng dân, người bị đâm sẽ bị mất chức năng cả trận.</p>
                <p>⚔️ Kiếm xanh:<br>
                Đâm trúng phe 3 hoặc sói, sang đêm hôm sau ngay lập tức người đó bị treo. ( kiếm xanh không có tác dụng khi đâm trúng dân )</p>

                <p><b>─ TRƯỞNG LÀNG 👳‍♂️:</b> có 2 mạng vào ban đêm và vote của Trưởng Làng sẽ được tính x2 trong cả ván game.</p>
                <p>👳‍♂️ Sói cắn, Sói Phù ném tử hoặc phe 3 tác động trưởng làng có 2 mạng ( kể cả bị hỏi ).</p>
                <p>👳‍♂️ Trường hợp chết ngay lập tức:<br>
                Ngục, Gác bắn.<br>
                Sói Nguyền Rủa rủa chết.<br>
                Bị treo vào ban ngày.</p>

                <p><b>─ ĐỨC VUA 👑 :</b> được skip ( bỏ qua) 2 lần không cần vote trong một trận đấu ( tính từ đêm 2).</p>
                <p>👑 Đức Vua bị treo: Phe Dân sẽ bị mất hết chức năng.</p>
                <p>👑 Đức Vua bị sói cắn: Động sói sẽ bị chết một con bất kì. [ Sói chết không thể cứu hay vệ. Quản báo số lượng sói ( vd: 1 2 3 ), không báo số nhân, char sói chính xác để Vua chọn. ]</p>

                <p><b>─ THÁI Y 💊 :</b> Mỗi đêm chọn một bệnh nhân, nếu bệnh nhân bị Sói cắn, thái y có 2 viên thuốc random để chọn cho bệnh nhân uống.</p>
                <p>💊 Sẽ có một viên sống và một viên chết. ( do quản quyết định viên Sống Chết và Thái Y chọn).</p>
                <p>💊 Chỉ có thể dùng thuốc khi bị Sói cắn. Còn lại vẫn sẽ chết.</p>

                <p><b>─ SONG SINH 👯‍♂️ :</b> mỗi đêm chọn một người để làm song sinh nếu một trong hai chết người còn lại sẽ hóa sói kể cả phe 3.</p>

                <p><b>─ LỰC SĨ 💪 :</b> Chọn một người để bảo vệ mỗi đêm.</p>
                <p>💪 Khi người được chọn bị tấn công, Lực Sĩ sẽ thấy được vai trò người tấn công, người được bảo vệ sẽ không chết, nhưng Lực Sĩ sẽ chết vào cuối ngày hôm sau.</p>

                <p><b>─ ẢNH TỬ 🎬 :</b> Chọn một người duy nhất từ đêm đầu tiên. Nếu người đó chết, ảnh tử sẽ thay thế chức năng của người đó.</p>
                <p>🎬 Nếu người được chọn không chết trong suốt trận, ảnh tử sẽ tồn tại như một dân thường.</p>
                <p>🎬 Khả năng lựa chọn đêm 1 không bị ảnh hưởng bởi mất chức năng.</p>

                <p><b>─ NGƯỜI BỆNH 🤒 :</b> Nếu người bệnh bị sói cắn, sói không thể cắn ai vào đêm tiếp theo do bị nhiễm dịch bệnh.</p>

                <p><b>–-THẦY TU 📿 :</b> Mỗi đêm chẵn trong ván game ( 2, 4, 6,... ) Thầy tu thức dậy chọn một người chơi để được bảo vệ bởi sức mạnh của Bề Trên.</p>
                <p>📿 Người chơi này sẽ bất tử vào đêm hôm đó và chỉ bị loại bởi các lý do vào ban ngày. ( như bị treo cổ).</p>
                <p>📿 Thầy Tu không được tự chọn bản thân.</p>

                <p><b>— MỤC SƯ 💧:</b> Người sẽ chọn vẩy nước thánh một người bất kì vào buổi sáng. [ một lần duy nhất ]<br>
                Nếu là sói: Người bị vẩy chết ngay lập tức.<br>
                Nếu là dân hoặc phe 3: Người bị vẩy vẫn sống nhưng Mục Sư sẽ chết.</p>
                <p>⚠️ Mục có thể vẩy vào bất lúc khi nào buổi sáng, kể cả lúc vote và treo giàn.</p>

                <p><b>— KỴ SĨ 🤺 :</b> Chàng kỵ sĩ mang thanh gươm sắt nhọn được quyền tự lật bài của bản thân và đâm một người vào giai đoạn thảo luận của buổi sáng. [ lật bài và đâm diễn ra cùng một lúc, 1 lần duy nhất cho cả ván game ]<br>
                🤺 Đâm trúng sói hoặc phe 3: Kẻ bị đâm chết<br>
                🤺 Đâm dân: Kỵ sĩ chết.<br>
                🤺 Sau khi kỵ sĩ lật bài và đâm, sẽ skip giai đoạn vote, đêm xuống ngay.</p>
                <p>⚠️ Kỵ sĩ chỉ được quyền đâm và lật bài lúc luận.</p>

                <p><b>— KỸ NỮ 💃 :</b> Mỗi đêm chọn ngủ với một người. Người bị ngủ sẽ không thể dùng được chức năng đêm đó. ( Bất kì chức năng nào, có Khiên hay Bảo Vệ cũng đều thế )<br>
                💃 Kỹ Nữ sẽ không thể ngủ nếu bị Quản Ngục giam.<br>
                💃 Kỹ ngủ với sói đầu đàn, đêm đó sói sẽ bị gãy răng, móm tập thể không thể cắn người. Nếu kỹ nữ bị giết trong đêm, người ngủ cùng sẽ chết chung.</p>

                <p><b>— THẦY ĐỒNG ⚖️ :</b> Từ đêm thứ 2, mỗi đêm thức dậy lên đồng, chọn một người chết để gọi hồn về hỏi và có thể hồi sinh một người chết [ một lần duy nhất ].<br>
                ⚖️ Sau khi hồi sinh, chức năng của Thầy Đồng sẽ biến mất. Không lên đồng được nữa. Thầy Đồng không được phép hỏi 1 người 2 đêm liên tục.<br>
                ⚖️ Người được hồi sinh sẽ được hồi phục hoàn toàn chức năng và trở về char gốc của bản thân. [ trừ người đã hóa sói ]</p>
                <p>⚠️ Với Couple và Đồng Phạm đã chết: 1 trong 2 người được hồi sinh sẽ sống lại với char gốc của họ. ( không còn là phe 3 đối với couple và đồng phạm ).</p>

                <p><b>— NGƯỜI CANH GÁC 👮‍♂️ :</b> Vào ban ngày, người canh gác có thể lật thẻ bài của một người chơi khác [ nếu bị hóa, lật ra char bị hóa ], hoặc chọn bắn một người chơi bất kì mà bạn muốn [ nhắm bắn và lật bài là 2 chức năng khác nhau và phải diễn ra vào 2 ngày khác nhau ]<br>
                👮‍♂️ Đối với lật thẻ bài: Chỉ có thể lật một lần trong toàn bộ ván game. Nếu người bị lật là dân: thẻ bài sẽ được lật công khai. Nếu người bị lật là sói hoặc phe ba: người canh gác sẽ bị phản phệ, thẻ bài của bản thân cũng sẽ bị lật. Và chỉ người bị lật và người canh gác biết.<br>
                👮‍♂️ Đối với nhắm bắn: Người canh gác chỉ có thể bắn một lần duy nhất, không bắn trùng ngày lật thẻ bài.</p>
                <p>⚠️ Gác chỉ được quyền lật bài và nhắm bắn trong lúc Luận.</p>

                <p><b>— QUẢN NGỤC ⛓️‍💥 :</b> Mỗi đêm bắt và giam giữ một người vào phòng giam để hỏi. Không được phép giam 1 người 2 đêm liên tục.<br>
                ⛓️‍💥 Người bị giam không thể dùng chức năng và không thể bị giết hay bất kì tác động nào vào đêm đó. Tri và Thám nếu chọn sẽ được báo "không thể soi”. Lực không thể chết thay nếu người bị giam bị Ngục bắn.<br>
                ⛓️‍💥 Nếu nghi ngờ người trong phòng giam là sói hoặc phe ba, quản ngục có một viên đạn duy nhất để hành quyết ngay trong đêm.<br>
                ⛓️‍💥 Đạn của quản ngục khi đã giam và bắn không thể vệ hoặc cứu vì bất cứ lý do gì.</p>

                <p><b>– THẨM PHÁN 🧑‍⚖️ :</b> Một lần trong toàn bộ ván chơi, Thẩm Phán có quyền đưa ra quyết định tiến hành lần vote treo cổ thứ 2 trước khi bảo báo đêm tiếp theo.</p>

                <p><b>--- NGƯỜI KHAI MỆNH 🀄 :</b> Có 2 lá bài, đêm đầu tiên sẽ phát cho 2 người chơi bất kì.<br>
                🀄 Người nhận được lá bài sẽ được quản thông báo và biết sự xuất hiện của Người Khai Mệnh.<br>
                🀄 Nếu Người Khai Mệnh chết, có thể chọn 1 trong 2 lá bài đã phát để lật lên chat của người nhận [ nếu bị hóa, lật ra char bị hóa ].</p>
                <p>⚠️ Khả năng phát bài đêm 1 không bị ảnh hưởng bởi mất chức năng.</p>

                <p><b>--- NGƯỜI HÒA BÌNH 🕊 :</b> Được quyền cứu 1 người chơi thoát khỏi án treo vào buổi sáng.<br>
                🕊 Thực hiện 1 lần duy nhất cho cả ván game.<br>
                🕊 Được quyền tự cứu bản thân thoát treo.</p>

                <p><b>— NHÀ THIÊN VĂN HỌC 🌙🌠 :</b> Có hai chức năng được thực hiện vào 2 đêm khác nhau. Mỗi chức năng có 1 lần sử dụng cho cả ván game.<br>
                🌙 Trăng Non: Dùng lên Động Sói, khiến Sói không thể cắn người vào đêm hôm đó. [ báo mưa ở box Sói ]<br>
                🌠 Mưa Sao Băng: Dùng để giết chết một người chơi bất kì. Nếu người chơi đó là dân, Nhà Thiên Văn Học và cả người được chọn sẽ chết.</p>
                <p>⚠️ Nếu Người chơi là Dân và đang được nhận Bảo Vệ ( Vệ, Tu, Khiên, Lực): người chơi là Dân vẫn sẽ sống, nhưng Nhà Thiên Văn Học sẽ chết ( dù có được nhận bảo vệ ).</p>

                <p><b>─ BÁN SÓI 🐾 :</b> Giống với dân làng, nhưng bị sói cắn sẽ hóa sói.<br>
                🐾 Khi chưa hóa sói, Tiên Tri soi Bán Sói ra “dân”.<br>
                🐾 Sau khi hóa sói, Tiên Tri soi Bán Sói ra “không rõ”.<br>
                🐾 Nếu cả trận sói không cắn, xem như là bên Phe Dân.</p>
            `
        },
        'wolf-content': {
            title: 'Phe Ma Sói [ 17 ]',
            html: `
                <h3>II. PHE SÓI\n[ 17 ]</h3>
                <p>‼️ phe sói sẽ tạo box riêng, mỗi đêm đàn sói được lựa chọn cắn một người.<br>
                Dân hoặc Phe 3 khi bị hóa sói sẽ mất đi chức năng của char gốc.<br>
                Sói chết phải rời khỏi box Sói và không được quyền tham gia suy luận.</p>

                <p><b>─ SÓI THƯỜNG 🐺 :</b> mỗi đêm chọn một người để cắn, sáng hôm sau người đó chết.<br>
                🐺 Động sói cắn không chết phe 3. Trừ Thái Tử.</p>

                <p><b>– SÓI NỮ 🐺👩‍🦰 :</b> 2 lần trong 1 ván game, thức dậy chọn 1 người không phải sói. Tiên tri sẽ soi người đó ra “Ác” vào đêm nay.</p>

                <p><b>– SÓI NAM 🐺👱‍♂️ :</b> 2 lần trong 1 ván game, chọn 1 Sói. Tiên tri sẽ soi sói đó ra "Thiện” vào đêm nay.</p>

                <p><b>─ SÓI TIÊN TRI 🐺🔮 :</b> mỗi đêm dậy soi một người trong làng, quản sẽ thông báo người bị soi đang giữ char có khả năng giết hoặc không.<br>
                ✔️ Có.<br>
                ❌️ Không.<br>
                🐺🔮 Ví dụ: soi 00 char có khả năng giết, quản trả lời "Có.” nghĩa là 00 là char có khả năng giết người.</p>

                <p><b>─ SÓI ĐẦU ĐÀN 🐺👳‍♂️:</b> giống sói thường nhưng khi sói đầu đàn chết, lập tức tất cả sói trong động đều sẽ chết ( trừ Sói Trắng).<br>
                ⚠️ Vote vào buổi sáng của Sói Đầu Đàn sẽ được tính x2 trong cả ván game.</p>

                <p><b>─ SÓI CÔ LẬP 🐺🚶‍➡️:</b> Sói cô lập hành động một mình, không chung động sói. Mỗi đêm sói cô lập được chọn một người.<br>
                🚶‍➡️ Nếu người đó là sói: Sói cô lập được vào chung với động sói.<br>
                🚶‍➡️ Nếu người đó là dân hoặc phe ba: Không có gì xảy ra.<br>
                ⚠️ Khi chưa vào động Sói, Tri và Thám soi ra "không rõ”. Vào động soi ra "Ác”.</p>

                <p><b>– SÓI ÁC MỘNG 🐺🌑 :</b> Mỗi đêm, Sói Ác Mộng tiến vào giấc mơ của một người chơi để khiến người đấy chìm vào giấc ngủ say và không thể sử dụng chức năng của mình đêm hôm đó.<br>
                🌑 Mất tác dụng khi người chơi được nhận Bảo Vệ và bị Ngục Giam.</p>

                <p><b>─ SÓI BĂNG 🐺❄️:</b> Mỗi đêm, chọn 1 người và biến họ thành cục băng đến cuối sáng hôm sau. [ 3 lần sử dụng ]<br>
                ❄️ Người đó không thể thực hiện chức năng đêm đó và buổi sáng sẽ bị câm, không được tranh luận.<br>
                ❄️ Người bị băng vẫn được quyền vote, nếu bị treo vẫn được biện và nhận chất. ( không được quyền chất người bị treo )</p>

                <p><b>─ SÓI GIÀ 🐺👳‍♂️:</b> khi bị tiên tri soi ở đêm 1, sói già sẽ không bị lộ thân phận ( “không rõ” ).<br>
                👳‍♂️ Nếu sói già sống sót cuối cùng trong Động sói, phe sói sẽ thắng.</p>

                <p><b>─ SÓI HỘ VỆ 🐺🫂 :</b> mỗi đêm bảo vệ một con sói trong đàn.<br>
                🫂 Không được bảo vệ một sói liên tiếp 2 đêm, chỉ được bảo vệ 2 lần duy nhất.<br>
                🫂 Sói hộ có quyền bảo vệ một con sói trong đàn thoát khỏi án treo nhưng sau khi thực hiện sẽ bị mất chức năng và trở thành sói thường.</p>

                <p><b>─ SÓI PHÙ THỦY 🐺🧙‍♀️:</b> sở hữu 2 bình , giết và cứu, chỉ được sử dụng một bình trong 2 đêm. ( bình Cứu không cứu được Sói bị Phù ném Tử, Ngục bắn, phe 3 hỏi ).<br>
                🧙‍♀️ Nếu đêm 1 sử dụng bình, sang đêm thứ 3 mới có thể sử dụng tiếp bình còn lại.</p>

                <p><b>— SÓI NGUYỀN RỦA 🐺🪄:</b> mỗi đêm dậy nguyền rủa một người. Có hai lựa chọn. [ không dùng chung 1 ngày ]<br>
                🪄 Nguyền rủa về phe: nếu người bị nguyền là dân sẽ trở thành sói khi không được bảo vệ. Tuy nhiên phe 3 bị nguyền thì không có tác dụng.<br>
                🪄 Nguyền rủa chết: người bị nguyền mất chức năng đêm đầu và đêm hôm sau lập tức chết kể cả được Bảo Vệ, Thầy Tu hay Lực Sĩ chọn. [ Không báo phù ]<br>
                🪄 Mỗi lời nguyền chỉ được 1 lần sử dụng.</p>

                <p><b>─ SÓI’s QUÝ’s TỘC’s 🐺💅:</b> đêm dậy chọn kéo một người về phe [ 2 lần kéo ].<br>
                💅 Không kéo được phe 3, không kéo được dân đang được Bảo Vệ.</p>

                <p><b>─ KẺ PHẢN BỘI 🐺👺 :</b> Hoạt động riêng lẻ, không có quyền cắn, không vào cùng Động Sói.<br>
                👺Kẻ phản bội được biết ai là Sói, được báo Sói cắn ai vào mỗi đêm nhưng Sói sẽ không biết về sự hiện diện của kẻ phản bội ( vẫn là phe Sói ).<br>
                👺Tri soi kẻ phản bội sẽ ra "không rõ”.</p>

                <p><b>--- SÓI ĐIÊN CUỒNG 🐺🤡 :</b> Một đêm duy nhất trong cả ván game, có thể bật chế độ "Điên cuồng" 1 lần để cắn người chơi khác. ( tính cuồng và cắn là 1 )<br>
                🐺🤡 Nếu người chơi đó được nhận Bảo Vệ ( Sinh, Lực, Vệ, Khiên, Tu, Y ), cả người chơi và những ai bảo vệ nạn nhân đều sẽ chết.<br>
                🐺🤡 Nếu người được chọn được Phù Thủy cứu hoặc đang bị Quản Ngục giam, chế độ Điên Cuồng sẽ mất tác dụng.</p>

                <p><b>--- SÓI NON 🐺👶 :</b> Khi Sói Non bị treo cổ, Động Sói đêm kế tiếp được quyền cắn 2 người chơi.<br>
                🐺👶 Sói Non chết vào buổi đêm, ngay lập tức đêm hôm đó Sói được cắn 2 người.<br>
                🐺👶 Nếu đêm Sói Non chết Động Sói bị Nhà Thiên Văn Học thả "Trăng non". Chế độ cắn x2 sẽ dời sang đêm tiếp theo.</p>

                <p><b>─ SÓI SI ĐA 🐺🧌:</b> Trong 3 đêm đầu, bất kì ai tác động gây sát thương vào Sói si đa thì người đó bị lây si đa và chết cùng Sói Si Đa. ( chỉ 1 lần duy nhất )<br>
                🧌Không tác dụng:<br>
                Khi bị ghép couple: Đối phương chết kéo theo Sói Si Đa.<br>
                Bị vote treo hoặc chỉ định Tử, bắn vào buổi sáng.<br>
                Bất kì char nào khác chết kéo theo Sói Si Đa. ( chỉ lây khi bị tác động trực tiếp )<br>
                🧌 Kiếm xanh đâm trúng Sói Si Đa: Sói Si Đa bị treo, Chiến Binh chết.</p>
            `
        },
        'third-content': {
            title: 'Phe Thứ Ba [ 14 ]',
            html: `
                <h3>III. PHE 3\n[ 14 ]</h3>
                <p>‼️Sói cắn không chết ( Sói Phù ném bình Tử, Sói Nguyền Rủa nguyền chết thì chết ).<br>
                Phe 3 không thể bị Sói Nguyền Rủa và Sói Quý Tộc làm cho hóa Sói. Tuy nhiên vẫn sẽ bị hóa sói bởi Song Sinh của dân.</p>

                <p><b>─ CUPID 💘 :</b> Đêm đầu tiên sẽ thức dậy bắn tên ghép đôi hai người với nhau [ 1 lần duy nhất cho cả trận ], được phép ghép đôi bản thân với người khác.<br>
                Ghép sói với sói => Sói.<br>
                Ghép dân với dân => Dân.<br>
                Ghép sói với dân, phe 3 => Phe 3.<br>
                💘 Sói khi bị ghép với phe khác sẽ trở thành phe 3.<br>
                💘 Hai người bị ghép đôi sẽ biết chức năng của đối phương, được giữ nguyên chức năng, nếu một trong hai chết, đối phương sẽ chết theo, sau đó Cupid sẽ trở thành dân thường.<br>
                ⚠️ Khi hóa sói:<br>
                Đối với Cupid: Cupid hóa sói. ( 1 minh ); Cupid bị soi ra "Ác”.<br>
                Đối với Couple: Nếu 1 trong 2 hóa sói, người còn lại cũng hóa theo. Khi đó Cupid trở thành dân thường; Tiên Tri soi Couple bị hóa sói ra "không rõ”.<br>
                ⚠️ Chiến thắng:<br>
                Nếu Cupid và Couple còn sống: Thắng khi diệt hết sói, Phe 3 khác là sỉ số bằng dân. ( 3v3 )<br>
                Nếu chỉ Couple còn sống: Thắng khi diệt hết Sói, Phe 3 khác và sĩ số bằng dân. ( 2v2 )</p>

                <p><b>─ NGỐ 🤪 :</b> Mỗi sáng thức dậy gây nhiễu loạn dân làng. [ thắng khi bị treo cổ, thua khi chết trong đêm ]<br>
                🤪 Nếu Ngố bị hóa ( sói, côn, vamp ) khả năng win khi treo cổ sẽ mất tác dụng.<br>
                ⚠️ Thua Cuộc:<br>
                Khi ngố là người chơi cuối cùng còn sống -> Phe dân làng được xử thắng.<br>
                Khi Ngố có sỉ số 1v1 với Dân -> Dân Thắng.<br>
                Khi Ngố có sỉ số 1v1 với Sói -> Sói Thắng.</p>

                <p><b>– VAMPIRE 🧛 :</b> Vampire mỗi đêm thức dậy cắn 1 người.<br>
                Nếu là dân: người đó sẽ mất chức năng [ vào hôm sau ] và hóa thành Vampire con đời sau nếu không được Bảo Vệ. [ người hóa sẽ được quản báo, Vampire con không được biết Vampire là ai ].<br>
                Nếu là sói hoặc Phe 3: chết ngay trong đêm.<br>
                🧛 Nếu Vampire chết, tất cả Vampire con đời sau sẽ chết theo.<br>
                ⚠️ Thắng cùng đàn Vampire con sau khi diệt hết kẻ địch.</p>

                <p><b>─ THIÊN SỨ 😇 :</b> Nếu bị giết vào đêm 1 hoặc bị treo cổ, giết vào sáng 1. Thiên sứ sẽ thắng, ngược lại, thiên sứ thành dân thường. [ khi hóa dân Tri soi "not clear" ]<br>
                ⚠️ Thắng khi bị giết vào đêm 1 hoặc sáng 1.</p>

                <p><b>– KẺ THỔI SÁO 🪈 :</b> mỗi đêm thức dậy chọn thổi sáo thôi miên 1 người chơi. [ người chơi không được thông báo ]<br>
                ⚠️ Thắng khi tất cả những người chơi còn sống đều đã bị thôi miên.</p>

                <p><b>─ KẺ SĂN NGƯỜI 👉 :</b> Chọn một người chơi để lừa treo cổ. [ 1 lần duy nhất cho cả ván ]<br>
                👉 Nếu người đó bị giết trong đêm, kẻ săn người sẽ trở thành dân. [ khi hóa dân Tri soi "không rõ ]<br>
                👉 Việc lựa chọn đêm 1 không bị ảnh hưởng bởi mất chức năng.<br>
                ⚠️ Thắng khi người được chọn treo cổ bị treo vào buổi sáng.</p>

                <p><b>– KẺ ĂN THỊT NGƯỜI 👹 :</b> Mỗi đêm thức dậy, có thể chọn ăn thịt một người chơi hoặc "nhịn đói" để giết tối đa 3 người trong một đêm.<br>
                👹 Nếu bị khóa chức năng, lần cộng dồn của đêm hôm đó sẽ mất tác dụng. ( vd: đêm 1 nhịn, đêm 2 mất chức năng => đêm 3 được ăn 1 lúc 2 mạng ).<br>
                ⚠️ Thắng khi diệt hết Sói, Phe 3 khác và sĩ số bằng dân.</p>

                <p><b>─ HOÀNG HẬU 👸 :</b> Mỗi đêm chọn 1 người để hỏi A hoặc B. Người trả lời sai sẽ chết.<br>
                ⚠️ Thắng khi diệt hết Sói, Phe 3 khác và sĩ số bằng dân.</p>

                <p><b>─ SÁT NHÂN 🔪 :</b> Mỗi đêm chọn 1 người để giết chết.<br>
                ⚠️ Thắng khi diệt hết Sói, Phe 3 khác và sĩ số bằng dân.</p>

                <p><b>─ CÔN ĐỒ 🛶 :</b> Đêm mỗi ván game, thức dậy chọn 1 người làm đồng phạm. Côn đồ và đồng phạm mỗi đêm giết một người. [ Đồng phạm được chọn sẽ mất chức năng char gốc ]<br>
                🛶 Đồng phạm chết côn đồ có thể tìm đồng phạm mới.<br>
                🛶 Cồn đồ chết, Đồng phạm sẽ chết theo.<br>
                🐺 Đối với Đồng Phạm: Hóa sói, Côn đồ tìm đồng phạm mới; Tri soi Đồng Phạm ra "Không rõ”.<br>
                🐺 Đối với Côn Đồ: Hóa sói, Đồng phạm cũng sẽ hóa sói theo: Tri soi Côn đồ ra "Ác”.<br>
                ⚠️ Thắng khi diệt hết sói, phe 3 khác và sỉ số bằng dân. ( 2v2 )</p>

                <p><b>─ TAROT READER ♦️:</b><br>
                ♦️Có 3 lá bài, người bị chọn phải bốc 1 trong 3 lá.<br>
                Gồm:<br>
                ♠️ Sun: Sống.<br>
                ♥️ Dead: chết.<br>
                ♣️ Loser: mất chức năng.<br>
                ♦️ Tarot có quyền tráo đổi thứ tự bài.<br>
                ⚠️ Thắng khi diệt hết sói, phe 3 khác và sỉ số bằng dân.</p>

                <p><b>─ THÁI TỬ 🧝‍♂️ :</b> mỗi đêm lẻ ( 1 3 5… ) Thái Tử thức dậy chọn nương tử. Không được phép chọn 1 người 2 lần.<br>
                Chọn trúng dân, cộng một mạng.<br>
                Chọn trúng sói, trừ một mạng.<br>
                Chọn trúng phe 3, không tác dụng.<br>
                🧝‍♂️ Khi Thái Tử bị nả, treo, hỏi, ngục bắn... đều chỉ trừ 1 mạng.<br>
                🧝‍♂️ Trường hợp Thái Tử chết do bị trừ mạng, Thái Tử sẽ chết một mình.<br>
                🧝‍♂️ Thái Tử chỉ chết ngay lập tức khi bị sói cắn trúng. Người được Thái Tử chọn vào đêm Thái Tử bị sói cắn cũng sẽ chết.<br>
                ⚠️ Thắng khi diệt hết sói, phe 3 khác và sĩ số bằng dân.</p>

                <p><b>-– BÁ TƯỚC 🏇 :</b> Trong 3 đêm đầu tiên, Bá Tước sẽ thức dậy và chọn 3 người làm vợ ( nếu bị mất chức năng sẽ chọn bù vào đêm tiếp theo).<br>
                🏇 Đến sáng hôm sau của đêm cuối cùng được chọn vợ, nếu 3 người vợ và bá tước đều còn sống thì Bá Tước win.<br>
                🏇 Trong thời gian chọn vợ nếu 1 trong 3 người vợ chết, Bá Tước sẽ chết theo.<br>
                ⚠️ Thắng vào buổi sáng đêm cuối cùng chọn vợ nếu cả 3 người vợ đều còn sống.</p>

                <p><b>─ SÓI TRẮNG 🐺⚪️ :</b> Bình thường Sói Trắng hành động như những con Sói khác để chúng tin tưởng. Sói trắng thức cùng Sói và cùng chọn 1 nạn nhân để cắn.<br>
                ⚪️ Tuy nhiên, sau khi những con Sói ngủ, mỗi đêm chẵn [ 2 4 6 ] Sói trắng có thể thức dậy và giết 1 con Sói nếu muốn.<br>
                ⚪️ Khi tất cả Sói trừ Sói Trắng chết hết, Sói Trắng vẫn tiếp tục thức dậy mỗi đêm và cắn một người chơi như Sói bình thường. [ cắn được cả Phe 3 ]<br>
                ⚠️ Thắng khi diệt hết Sói, Phe 3 khác và sĩ số bằng dân.</p>
            `
        }
    };

    // 4. Xử lý bấm vào menu
    const menuItems = document.querySelectorAll('.menu-item');
    const contentBox = document.getElementById('content-box');
    const contentTitle = document.getElementById('content-title');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetKey = item.getAttribute('data-target');
            if (dbContent[targetKey]) {
                contentTitle.innerText = dbContent[targetKey].title;
                contentBox.innerHTML = dbContent[targetKey].html;
                menuScreen.classList.remove('active');
                contentScreen.classList.add('active');
                contentBox.scrollTop = 0;
            }
        });
    });

    // 5. Nút Quay Lại Chi Tiết
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            contentScreen.classList.remove('active');
            menuScreen.classList.add('active');
        });
    }
});