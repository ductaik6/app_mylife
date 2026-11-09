/**
 * MyLife Dashboard – app.js
 * Features: Clock/greeting, Nav, Pomodoro, Finance (login-locked, VND formatter,
 *           pie & bar charts), Tasks, Health, AI chat, Lofi synth, Header utils
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==================== I18N DICTIONARY ====================
  const i18nData = {
    vi: {
      app_tagline: 'TRUNG TÂM NĂNG SUẤT',
      nav_overview: 'Tổng quan',
      nav_finance: 'Tài chính',
      nav_tasks: 'Công việc',
      nav_health: 'Sức khỏe',
      nav_settings: 'Cài đặt',
      badge_locked: 'Khóa',
      badge_unlocked: 'Đã mở',
      search_placeholder: 'Tìm kiếm nhiệm vụ, chi tiêu, tin tức...',
      search_project: 'Tìm kiếm dự án...',
      back_overview: 'Tổng quan',
      noti_title: 'Trung Tâm Thông Báo',
      noti_mark_read: 'Đánh dấu đã đọc',
      btn_user_guide: 'Hướng dẫn',
      
      // Overview Card 1: Finance
      card_finance_title: 'Tài chính cá nhân',
      card_finance_sub: 'Ngân sách & chi tiêu tháng',
      btn_manage: 'Quản lý',
      btn_record: 'Ghi chép',
      label_total_balance: 'Tổng Số Dư Khả Dụng',
      label_income: 'Thu nhập:',
      label_spent: 'Đã chi:',
      label_expense_ratio: 'Tỷ lệ chi tiêu / thu nhập',
      link_view_details: 'Xem chi tiết →',
      label_recent_trans: 'Giao dịch gần nhất',
      btn_view_all: 'Xem tất cả',
      lock_title: 'Dữ liệu tài chính được bảo vệ',
      lock_desc: 'Nhập mật khẩu để xem số dư & lịch sử chi tiêu',
      btn_unlock_now: 'Mở khóa xem ngay',

      // Overview Card 2: Tasks
      card_tasks_title: 'Công việc & Ưu tiên',
      card_tasks_sub: 'Quản lý mục tiêu & dự án hôm nay',
      btn_add_task_short: 'Thêm việc',
      label_daily_deadline: 'Hạn chót mục tiêu ngày',
      btn_customize: 'Tinh chỉnh',
      placeholder_task_name: 'Nhập tên nhiệm vụ cần làm...',
      btn_add_card_short: 'Thêm thẻ',
      btn_view_all_tasks: 'Xem tất cả nhiệm vụ ↓',
      btn_collapse_tasks: 'Thu gọn ↑',
      btn_clean_done_tasks: 'Dọn dẹp việc đã xong',
      clean_all_done: 'Dọn dẹp',

      // Overview Card 3: Weather
      today: 'Hôm nay',
      weather_location: 'Hà Nội, Việt Nam',
      weather_clear: 'Nắng nhẹ, trời quang',
      label_humidity: 'Độ ẩm',
      label_wind: 'Gió',
      label_uv: 'Chỉ số UV',
      label_uv_val: '2 (Thấp)',

      // Overview Card 4: Health
      card_health_title: 'Mục tiêu Sức Khỏe',
      card_health_sub: 'Thể chất, lượng nước & giấc ngủ',
      btn_add_step: 'Thêm bước',
      label_steps_target: '/ 10,000 bước',
      label_daily_steps: 'Vận động trong ngày',
      label_calories_burned: 'Năng lượng tiêu hao',
      label_water_intake: 'Lượng nước đã uống',
      label_sleep_tracker: 'Giấc ngủ',
      label_water: 'Nước',
      label_sleep: 'Ngủ',
      label_calories: 'Calo',
      link_view_health: 'Xem chi tiết',
      health_header_path: 'Theo dõi Sức Khỏe & Thể Lực',
      health_main_title: 'Trung Tâm Sức Khỏe & Thể Lực',
      health_subtitle: 'Theo dõi số bước, năng lượng tiêu hao, lượng nước uống và nhịp sinh học giấc ngủ khoa học',
      btn_health_settings: 'Cài đặt Mục tiêu',
      btn_log_health: 'Ghi nhận chỉ số',

      // Overview Card 5: News
      card_news_title: 'Thời Sự Hôm Nay',
      card_news_sub: 'Tin tức chọn lọc theo chủ đề',
      news_tab_all: 'Tất cả',
      news_tab_top: 'Tiêu điểm',
      news_tab_tech: 'Công nghệ',
      news_tab_economy: 'Kinh tế',
      news_tab_life: 'Đời sống',
      btn_view_all_news: 'Xem tất cả tin',
      placeholder_new_pin: 'Mã PIN mới...',
      label_current_pin_prefix: 'Mã PIN bảo vệ hiện tại',

      // Tasks View & Calendar
      tasks_header_path: 'Quản lý Công việc & Lịch trình',
      tasks_main_title: 'Trung Tâm Công Việc & Lịch Biểu',
      tag_live_sync: 'Đồng bộ trực quan',
      btn_task_settings: 'Cài đặt Mục tiêu',
      btn_create_task: 'Thêm việc mới',
      tab_board: 'Bảng việc',
      tab_calendar: 'Lịch biểu',
      tab_timeline: 'Tiến độ',
      tab_time_tracking: 'Bấm giờ',
      tab_reports: 'Báo cáo',
      btn_add_event: 'Thêm sự kiện',
      btn_load_demo: 'Nạp mẫu ảnh',
      th_time: 'Giờ',
      cal_click_hint: 'Bấm vào bất kỳ ô giờ nào để tạo nhanh sự kiện / lịch hẹn.',
      col_todo: 'Cần làm',
      col_doing: 'Đang làm',
      col_done: 'Đã hoàn thành',
      add_another_card: 'Thêm thẻ',

      // Finance Detailed View
      finance_header_path: 'Quản lý Tài chính',
      finance_main_title: 'Trung Tâm Quản Lý Tài Chính',
      finance_subtitle: 'Theo dõi dòng tiền, chi tiêu tất cả các tháng và quản lý ngân sách cá nhân',
      btn_reset_zero: 'Đặt lại về 0',
      btn_add_trans_long: 'Thêm giao dịch mới',
      finance_lock_prompt: 'Thông tin tài chính cá nhân của bạn được mã hóa và khóa. Vui lòng đăng nhập để xem chi tiết.',
      btn_login_view_finance: 'Đăng nhập để xem Tài chính',
      ftab_overview: '1. Tổng quan',
      ftab_reports: '2. Báo cáo 12 tháng',
      ftab_history: '3. Lịch sử chi tiêu',
      finance_period_label: 'Kỳ xem:',
      th_month: 'Tháng',
      th_income: 'Tổng Thu Nhập',
      th_spent: 'Tổng Chi Tiêu',
      th_net: 'Số Dư / Tiết Kiệm',
      th_ratio: 'Tỷ Lệ Chi (%)',
      th_actions: 'Thao Tác',
      th_time_full: 'Thời Gian (Ngày & Giờ)',
      th_trans_item: 'Khoản Giao Dịch',
      th_category: 'Danh Mục',
      th_type: 'Phân Loại',
      th_amount: 'Số Tiền (VND)',

      // Settings View
      settings_title: 'Cài Đặt Hệ Thống & Tùy Biến',
      settings_subtitle: 'Chuyển đổi ngôn ngữ Tiếng Việt / Tiếng Anh, bảo mật tài chính và quản lý mục tiêu cá nhân',
      lang_setting_title: 'Ngôn Ngữ Hiển Thị (Display Language)',
      lang_setting_desc: 'Chọn ngôn ngữ để đồng bộ toàn bộ giao diện: Thanh điều hướng, Lịch biểu, Bảng việc, Tài chính',
      security_title: 'Bảo Mật Tài Chính Cá Nhân',
      security_desc: 'Mã PIN 4 số dùng để khóa mờ số dư và lịch sử giao dịch nhạy cảm',
      current_pin_label: 'Mã PIN bảo vệ hiện tại',
      btn_change_pin: 'Đổi mã PIN',
      data_mgmt_title: 'Quản Lý Dữ Liệu & Bảng Biểu',
      data_mgmt_desc: 'Tùy chọn làm sạch bảng biểu hoặc nạp lại dữ liệu mẫu theo mong muốn',
      btn_clear_boards: 'Để trắng bảng biểu',
      desc_clear_boards: 'Xóa sạch các công việc & lịch trình để tự điền lại từ đầu',
      btn_load_mockup: 'Nạp mẫu như ảnh',
      desc_load_mockup: 'Nạp nhanh các thẻ mẫu pastel và danh sách việc giống ảnh',
      btn_reset_all: 'Đặt lại mặc định',
      desc_reset_all: 'Khôi phục toàn bộ ứng dụng về trạng thái nguyên bản',
      days_short: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
      days_full: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
      months_short: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
      allday_label: 'Cả ngày',
      tab_task_report: 'Báo cáo tiến độ',
      label_jump_date: 'Chọn ngày:',
      kpi_income_period: 'Thu Nhập Trong Kỳ',
      kpi_income_desc: 'Tổng các nguồn thu nhận về',
      kpi_spent_period: 'Chi Tiêu Trong Kỳ',
      kpi_spent_ratio: 'Tỷ lệ chi tiêu:',
      kpi_balance_period: 'Số Dư Ròng Trong Kỳ',
      top_spending_title: 'Top Chi Tiêu',
      top_spending_sub: 'Các hạng mục chi nhiều nhất',
      auto_categorized: 'Được phân loại tự động',
      by_selected_period: 'Theo kỳ được chọn',
      recent_trans_title: 'Giao Dịch Gần Đây',
      recent_trans_sub: 'Hiển thị rõ ngày giờ, danh mục & số tiền',
      btn_add_trans_short: 'Thêm giao dịch',
      link_view_all_history: 'Xem toàn bộ lịch sử →',
      task_report_title: 'Báo Cáo Tiến Độ Công Việc & Năng Suất',
      task_report_sub: 'Tổng hợp tiến độ thời gian thực, nhiệm vụ đã xong và khối lượng công việc hiện tại',
      report_total_tasks: 'Tổng công việc',
      report_completed_tasks: 'Đã hoàn thành',
      report_in_progress: 'Đang làm',
      report_todo: 'Cần làm',
      report_progress_rate: 'Tiến độ hoàn thành tổng thể',
      report_project_breakdown: 'Tiến độ theo Dự án',
      report_doing_tasks_title: 'Công việc đang thực hiện',
      report_done_tasks_title: 'Công việc đã hoàn thành',
      report_btn_close: 'Đóng báo cáo',
      login_modal_title: 'Xác thực Tài chính',
      login_modal_sub: 'Nhập mật khẩu để truy cập dữ liệu tài chính cá nhân của bạn',
      placeholder_password: 'Nhập mật khẩu...',
      login_error_text: 'Mật khẩu không đúng! Vui lòng thử lại.',
      login_hint_default: 'Mật khẩu hiện tại:',
      login_hint_change: 'Bạn có thể đổi mật khẩu trong phần Cài đặt.',
      btn_unlock_submit: 'Mở khóa',
      btn_cancel: 'Hủy bỏ',
      news_modal_title: 'Tùy Chọn Chủ Đề Tin Tức',
      news_modal_sub: 'Chọn các nguồn tin bạn muốn ưu tiên hiển thị',
      news_topic_top_label: 'Tin Tiêu Điểm & Thời Sự Chính',
      news_topic_tech_label: 'Công Nghệ, AI & Lập Trình',
      news_topic_economy_label: 'Kinh Tế, Tài Chính & Đầu Tư',
      news_topic_life_label: 'Đời Sống, Sức Khỏe & Xã Hội',
      btn_save_pref: 'Lưu tùy chọn',
      label_working_hours: 'Khung giờ:',
      theme_setting_title: 'Giao Diện Hệ Thống (Sáng / Tối)',
      theme_setting_desc: 'Tùy biến hiển thị: Chế độ sáng ban ngày hoặc chế độ tối dịu mắt ban đêm',
      theme_light_title: 'Giao diện Sáng',
      theme_light_desc: 'Nền trắng tinh gọn, rõ ràng',
      theme_dark_title: 'Giao diện Tối',
      theme_dark_desc: 'Nền than chì sang trọng, dịu mắt',
      theme_system_title: 'Tự động (Hệ thống)',
      theme_system_desc: 'Theo cài đặt thiết bị của bạn',

      // Bổ sung đồng bộ đa ngôn ngữ 100%
      nav_ai: 'Trợ lý AI',
      health_chart_activity: 'Vận Động 7 Ngày',
      health_chart_activity_sub: 'Theo từng ngày thực tế (không tự điền số giả)',
      health_chart_sleep: 'Giấc Ngủ 7 Ngày (Chu Kỳ 90m)',
      health_chart_sleep_sub: 'Chuẩn khoa học: 7.0h – 9.0h (5 chu kỳ 90 phút)',
      health_stat_avg: 'TB:',
      health_stat_total: 'Tổng:',
      health_stat_goal: 'Đạt:',
      health_stat_score: 'Điểm:',
      health_click_steps_hint: 'Bấm cột để chỉ nhập bước chân',
      btn_log_steps: 'Nhập bước chân',
      btn_log_sleep: 'Nhập giờ ngủ',
      btn_log_water: 'Tự điền nước',
      btn_drink_now: 'Uống ngay 1 ly (250ml)',
      water_station_title: 'Trạm Nước 8 Ly Mỗi Ngày',
      water_station_sub: 'Bấm từng ly để ghi nhận 250ml hoặc uống nhanh',
      water_reminder_toggle: 'Bật nhắc nhở thông minh',
      news_badge_live: 'Trực tiếp',
      news_live_sub: 'Tin tức chọn lọc theo chủ đề • Cập nhật thời gian thực',
      cal_btn_today: 'Hôm nay',
      cal_btn_add_event: 'Thêm Lịch Hẹn',
      btn_add_card_kanban: '+ Thêm Thẻ Công Việc',
      modal_health_title: 'Ghi Nhận Chỉ Số Sức Khỏe',
      modal_health_sub: 'Cập nhật nhanh bước chân, lượng nước và giấc ngủ',
      tab_log_steps: 'Bước chân',
      tab_log_water: 'Nước uống',
      tab_log_sleep: 'Giấc ngủ',
      tab_log_all: 'Tất cả',
      lbl_log_date: 'Ngày ghi nhận chỉ số',
      lbl_log_steps: 'Số bước chân trong ngày',
      lbl_log_water: 'Lượng nước uống (ml)',
      lbl_log_sleep: 'Giấc ngủ & Chu kỳ 90 phút',
      lbl_bedtime: 'Giờ đi ngủ:',
      lbl_waketime: 'Giờ thức dậy:',
      lbl_total_sleep: 'Tổng số giờ ngủ:',
      btn_save_health: 'Lưu chỉ số',
      ai_drawer_title: 'Trợ Lý Gemini AI',
      ai_drawer_sub: 'Tối ưu thời gian & năng suất',
      ai_chip_schedule: 'Tối ưu lịch làm việc',
      ai_chip_health: 'Phân tích sức khỏe',
      ai_placeholder: 'Hỏi Gemini AI...',

      // Quản lý & Đăng nhập đa tài khoản (tối đa 20 tài khoản)
      acc_manager_title: 'Quản Lý Tài Khoản',
      acc_count_prefix: 'Đã lưu:',
      acc_count_suffix: '/20 tài khoản',
      acc_currently_active: 'Đang sử dụng',
      acc_other_accounts: 'Chuyển sang tài khoản khác:',
      acc_btn_add_another: '+ Đăng Nhập / Thêm Tài Khoản Mới',
      acc_btn_switch: 'Chuyển',
      acc_modal_add_title: 'Đăng Nhập Tài Khoản Mới',
      acc_modal_add_sub: 'Hỗ trợ lưu & chuyển đổi tối đa 20 tài khoản',
      acc_label_fullname: 'Họ và tên người dùng',
      acc_label_email: 'Email hoặc Tên đăng nhập',
      acc_label_password: 'Mật khẩu hoặc Mã PIN',
      acc_label_role: 'Vai trò',
      acc_label_color: 'Màu Avatar',
      acc_btn_login_submit: 'Đăng Nhập Ngay',
      acc_max_reached: 'Đã đạt giới hạn tối đa 20 tài khoản!',
      acc_switched_success: 'Đã chuyển sang tài khoản:',
      acc_login_success: 'Đăng nhập thành công tài khoản mới:',
      acc_help_password: 'Mật khẩu này dùng để ngăn người khác tự ý truy cập hoặc chuyển sang tài khoản của bạn.',
      acc_btn_change_pwd: 'Đổi mật khẩu / PIN',
      acc_btn_lock_session: 'Khóa phiên / Đăng xuất',
      acc_sec_auth_title: 'Xác Thực Danh Tính Tài Khoản',
      acc_sec_auth_sub: 'Đăng nhập vào tài khoản:',
      acc_sec_auth_pwd_label: 'Mật khẩu hoặc mã PIN bảo vệ',
      acc_sec_auth_default_hint: '(Thử nghiệm mặc định: 123456)',
      acc_sec_auth_error: 'Mật khẩu không chính xác! Bạn không được phép truy cập tài khoản này.',
      acc_sec_auth_unlock_btn: 'Mở Khóa & Đăng Nhập',
      acc_sec_locked_title: 'Phiên Làm Việc Đã Bị Khóa',
      acc_sec_locked_sub: 'Vui lòng nhập mật khẩu tài khoản để mở khóa hoặc đổi tài khoản khác.',
      acc_sec_change_title: 'Đổi Mật Khẩu / Mã PIN Bảo Mật',
      acc_sec_old_pwd: 'Mật khẩu hiện tại',
      acc_sec_new_pwd: 'Mật khẩu mới (tối thiểu 4 ký tự)',
      acc_sec_confirm_pwd: 'Xác nhận mật khẩu mới',
      acc_sec_btn_save_pwd: 'Lưu Mật Khẩu Mới',
      acc_sec_pwd_changed_success: 'Đổi mật khẩu thành công! Hãy ghi nhớ mật khẩu mới.',
      acc_sec_wrong_old_pwd: 'Mật khẩu hiện tại không đúng!',
      acc_sec_pwd_mismatch: 'Mật khẩu xác nhận không khớp!',
      acc_sec_switch_other: 'Đăng nhập tài khoản khác',
      google_login_title: 'Đăng nhập bằng Google',
      google_login_sub: 'để tiếp tục đến Hệ thống Quản lý Năng suất MYLIFE',
      google_label_email: 'Email Google hoặc Tên người dùng',
      google_label_password: 'Nhập mật khẩu tài khoản Google',
      google_btn_login: 'Xác Thực & Đăng Nhập',
      google_btn_login_bar: 'Đăng nhập với Google',
      google_btn_quick: 'Đăng nhập nhanh với Google'
    },
    en: {
      app_tagline: 'PRODUCTIVITY CENTER',
      nav_overview: 'Overview',
      nav_finance: 'Finance',
      nav_tasks: 'Tasks',
      nav_health: 'Health',
      nav_settings: 'Settings',
      badge_locked: 'Locked',
      badge_unlocked: 'Unlocked',
      search_placeholder: 'Search tasks, expenses, news...',
      search_project: 'Search project...',
      back_overview: 'Overview',
      noti_title: 'Notifications Center',
      noti_mark_read: 'Mark all read',
      btn_user_guide: 'User Guide',

      // Overview Card 1: Finance
      card_finance_title: 'Personal Finance',
      card_finance_sub: 'Monthly Budget & Expenses',
      btn_manage: 'Manage',
      btn_record: 'Record',
      label_total_balance: 'TOTAL AVAILABLE BALANCE',
      label_income: 'Income:',
      label_spent: 'Spent:',
      label_expense_ratio: 'Expense / Income Ratio',
      link_view_details: 'View Details →',
      label_recent_trans: 'RECENT TRANSACTIONS',
      btn_view_all: 'View All',
      lock_title: 'Financial Data Protected',
      lock_desc: 'Enter PIN to view balance & transactions',
      btn_unlock_now: 'Unlock to View',

      // Overview Card 2: Tasks
      card_tasks_title: 'Tasks & Priorities',
      card_tasks_sub: 'Daily goals & project management',
      btn_add_task_short: 'Add Task',
      label_daily_deadline: 'Daily Goal Deadline',
      btn_customize: 'Settings',
      placeholder_task_name: 'Enter task name to accomplish...',
      btn_add_card_short: 'Add Card',
      btn_view_all_tasks: 'View all tasks ↓',
      btn_collapse_tasks: 'Collapse ↑',
      btn_clean_done_tasks: 'Clean up completed',
      clean_all_done: 'Clean up',

      // Overview Card 3: Weather
      today: 'Today',
      weather_location: 'Hanoi, Vietnam',
      weather_clear: 'Partly cloudy, clear sky',
      label_humidity: 'Humidity',
      label_wind: 'Wind',
      label_uv: 'UV Index',
      label_uv_val: '2 (Low)',

      // Overview Card 4: Health
      card_health_title: 'Health Goals',
      card_health_sub: 'Fitness, hydration & sleep',
      btn_add_step: 'Add steps',
      label_steps_target: '/ 10,000 steps',
      label_daily_steps: 'Daily Movement',
      label_calories_burned: 'Calories Burned',
      label_water_intake: 'Water Intake',
      label_sleep_tracker: 'Sleep Tracker',
      label_water: 'Water',
      label_sleep: 'Sleep',
      label_calories: 'Calories',
      link_view_health: 'View details',
      health_header_path: 'Health & Fitness Tracking',
      health_main_title: 'Health & Wellness Hub',
      health_subtitle: 'Track daily steps, calories burned, hydration intake, and scientific circadian sleep schedule',
      btn_health_settings: 'Goal Settings',
      btn_log_health: 'Log Metrics',

      // Overview Card 5: News
      card_news_title: 'Daily News Brief',
      card_news_sub: 'Curated news by topic',
      news_tab_all: 'All',
      news_tab_top: 'Highlights',
      news_tab_tech: 'Tech & AI',
      news_tab_economy: 'Economy',
      news_tab_life: 'Lifestyle',
      btn_view_all_news: 'View all news',
      placeholder_new_pin: 'New PIN...',
      label_current_pin_prefix: 'Current Security PIN',

      // Tasks View & Calendar
      tasks_header_path: 'Task Management & Schedule',
      tasks_main_title: 'Tasks & Schedule Center',
      tag_live_sync: 'Visual Live Sync',
      btn_task_settings: 'Goal Settings',
      btn_create_task: 'Add New Task',
      tab_board: 'Board',
      tab_calendar: 'Calendar',
      tab_timeline: 'Timeline',
      tab_time_tracking: 'Time tracking',
      tab_reports: 'Reports',
      btn_add_event: 'Add Event',
      btn_load_demo: 'Load Mockup',
      th_time: 'Time',
      cal_click_hint: 'Click any time slot to quickly schedule a task or meeting.',
      col_todo: 'To-do',
      col_doing: 'In Progress',
      col_done: 'Completed',
      add_another_card: 'Add card',

      // Finance Detailed View
      finance_header_path: 'Finance Management',
      finance_main_title: 'Finance Management Center',
      finance_subtitle: 'Track cash flows, monthly spending, and personal budget',
      btn_reset_zero: 'Reset to 0',
      btn_add_trans_long: 'Add New Transaction',
      finance_lock_prompt: 'Your personal financial data is encrypted and locked. Please log in to view details.',
      btn_login_view_finance: 'Log In to View Finance',
      ftab_overview: '1. Overview',
      ftab_reports: '2. 12-Month Reports',
      ftab_history: '3. Transaction History',
      finance_period_label: 'Viewing Period:',
      th_month: 'Month',
      th_income: 'Total Income',
      th_spent: 'Total Expenses',
      th_net: 'Net Balance / Savings',
      th_ratio: 'Expense Ratio (%)',
      th_actions: 'Actions',
      th_time_full: 'Time (Date & Hour)',
      th_trans_item: 'Transaction Item',
      th_category: 'Category',
      th_type: 'Type',
      th_amount: 'Amount (VND)',

      // Settings View
      settings_title: 'System Settings & Preferences',
      settings_subtitle: 'Switch language between Vietnamese and English, manage security PIN, and configure daily goals',
      lang_setting_title: 'Display Language',
      lang_setting_desc: 'Select language to synchronize across all views: Navigation, Calendar, Task Board, and Finance',
      security_title: 'Personal Finance Security',
      security_desc: '4-digit PIN used to lock and blur sensitive balance and transaction records',
      current_pin_label: 'Current Security PIN',
      btn_change_pin: 'Update PIN',
      data_mgmt_title: 'Data & Board Management',
      data_mgmt_desc: 'Easily clear boards to start fresh or reload sample demo cards from mockup',
      btn_clear_boards: 'Clear all boards',
      desc_clear_boards: 'Empty all tasks and schedule slots so you can enter your own from scratch',
      btn_load_mockup: 'Load demo mockup',
      desc_load_mockup: 'Quickly load sample pastel pills and To-do cards matching the screenshot',
      btn_reset_all: 'Reset All Data',
      desc_reset_all: 'Restore all application defaults and clear cached local storage',
      days_short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      days_full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      months_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      allday_label: 'All day',
      tab_task_report: 'Progress Report',
      label_jump_date: 'Jump to Date:',
      kpi_income_period: 'Period Income',
      kpi_income_desc: 'Total incoming revenue',
      kpi_spent_period: 'Period Expenses',
      kpi_spent_ratio: 'Spending Ratio:',
      kpi_balance_period: 'Net Period Balance',
      top_spending_title: 'Top Expenses',
      top_spending_sub: 'Highest spending categories',
      auto_categorized: 'Auto-categorized',
      by_selected_period: 'By selected period',
      recent_trans_title: 'Recent Transactions',
      recent_trans_sub: 'Timestamps, categories & amounts',
      btn_add_trans_short: 'Add Transaction',
      link_view_all_history: 'View All History →',
      task_report_title: 'Task Progress & Productivity Report',
      task_report_sub: 'Real-time progress overview, completed tasks, and current workload',
      report_total_tasks: 'Total Tasks',
      report_completed_tasks: 'Completed',
      report_in_progress: 'In Progress',
      report_todo: 'To-do',
      report_progress_rate: 'Overall Completion Rate',
      report_project_breakdown: 'Progress by Project',
      report_doing_tasks_title: 'Tasks Currently In Progress',
      report_done_tasks_title: 'Completed Tasks',
      report_btn_close: 'Close Report',
      login_modal_title: 'Finance Authentication',
      login_modal_sub: 'Enter password to access your personal finance data',
      placeholder_password: 'Enter password...',
      login_error_text: 'Incorrect password! Please try again.',
      login_hint_default: 'Current password:',
      login_hint_change: 'You can change the password in Settings.',
      btn_unlock_submit: 'Unlock',
      btn_cancel: 'Cancel',
      news_modal_title: 'News Topic Preferences',
      news_modal_sub: 'Select news categories you want to highlight',
      news_topic_top_label: 'Highlights & Daily News',
      news_topic_tech_label: 'Technology, AI & Dev',
      news_topic_economy_label: 'Economy, Finance & Markets',
      news_topic_life_label: 'Lifestyle, Health & Wellness',
      btn_save_pref: 'Save Preferences',
      label_working_hours: 'Hours:',
      theme_setting_title: 'Theme System (Light / Dark)',
      theme_setting_desc: 'Customize display: Clean light daytime mode or eye-friendly dark mode at night',
      theme_light_title: 'Light Mode',
      theme_light_desc: 'Crisp white & clean contrast',
      theme_dark_title: 'Dark Mode',
      theme_dark_desc: 'Sleek dark slate, easier on eyes',
      theme_system_title: 'System Default',
      theme_system_desc: 'Matches your operating system',

      // 100% Complete Multilingual Synchronization
      nav_ai: 'AI Assistant',
      health_chart_activity: '7-Day Activity',
      health_chart_activity_sub: 'Daily actual records (no mock data)',
      health_chart_sleep: '7-Day Sleep (90m Cycles)',
      health_chart_sleep_sub: 'Scientific standard: 7.0h – 9.0h (5 cycles of 90m)',
      health_stat_avg: 'Avg:',
      health_stat_total: 'Total:',
      health_stat_goal: 'Met:',
      health_stat_score: 'Score:',
      health_click_steps_hint: 'Click column to log steps',
      btn_log_steps: 'Log Steps',
      btn_log_sleep: 'Log Sleep',
      btn_log_water: 'Custom Water',
      btn_drink_now: 'Drink 1 Cup (250ml)',
      water_station_title: 'Daily 8-Cup Water Station',
      water_station_sub: 'Click each cup to log 250ml or drink fast',
      water_reminder_toggle: 'Enable smart reminders',
      news_badge_live: 'Live',
      news_live_sub: 'Curated news by topic • Real-time updates',
      cal_btn_today: 'Today',
      cal_btn_add_event: 'Add Schedule',
      btn_add_card_kanban: '+ Add Task Card',
      modal_health_title: 'Log Health Metrics',
      modal_health_sub: 'Quickly record steps, hydration, and sleep',
      tab_log_steps: 'Steps',
      tab_log_water: 'Water',
      tab_log_sleep: 'Sleep',
      tab_log_all: 'All',
      lbl_log_date: 'Record Date',
      lbl_log_steps: 'Daily Steps',
      lbl_log_water: 'Water Intake (ml)',
      lbl_log_sleep: 'Sleep & 90-Min Cycles',
      lbl_bedtime: 'Bedtime:',
      lbl_waketime: 'Wake time:',
      lbl_total_sleep: 'Total sleep duration:',
      btn_save_health: 'Save Metrics',
      ai_drawer_title: 'Gemini AI Assistant',
      ai_drawer_sub: 'Optimize schedule & productivity',
      ai_chip_schedule: 'Optimize schedule',
      ai_chip_health: 'Health analysis',
      ai_placeholder: 'Ask Gemini AI...',

      // Multi-Account Manager & Login (up to 20 accounts)
      acc_manager_title: 'Account Management',
      acc_count_prefix: 'Saved:',
      acc_count_suffix: '/20 accounts',
      acc_currently_active: 'Currently Active',
      acc_other_accounts: 'Switch to another account:',
      acc_btn_add_another: '+ Log In / Add New Account',
      acc_btn_switch: 'Switch',
      acc_modal_add_title: 'Log In New Account',
      acc_modal_add_sub: 'Supports saving & switching up to 20 accounts',
      acc_label_fullname: 'Full Name',
      acc_label_email: 'Email or Username',
      acc_label_password: 'Password or PIN',
      acc_label_role: 'Role',
      acc_label_color: 'Avatar Color',
      acc_btn_login_submit: 'Log In Now',
      acc_max_reached: 'Maximum limit of 20 accounts reached!',
      acc_switched_success: 'Switched to account:',
      acc_login_success: 'Successfully logged into new account:',
      acc_help_password: 'This password prevents unauthorized access or switching to your account.',
      acc_btn_change_pwd: 'Change Password / PIN',
      acc_btn_lock_session: 'Lock Session / Log Out',
      acc_sec_auth_title: 'Account Identity Verification',
      acc_sec_auth_sub: 'Enter password/PIN to log into account:',
      acc_sec_auth_pwd_label: 'Security Password or PIN',
      acc_sec_auth_default_hint: '(Default test PIN: 123456)',
      acc_sec_auth_error: 'Incorrect password! You are not authorized to access this account.',
      acc_sec_auth_unlock_btn: 'Unlock & Log In',
      acc_sec_locked_title: 'Work Session Locked',
      acc_sec_locked_sub: 'Please enter account password to unlock or switch accounts.',
      acc_sec_change_title: 'Change Password / Security PIN',
      acc_sec_old_pwd: 'Current password',
      acc_sec_new_pwd: 'New password (min 4 chars)',
      acc_sec_confirm_pwd: 'Confirm new password',
      acc_sec_btn_save_pwd: 'Save New Password',
      acc_sec_pwd_changed_success: 'Password updated successfully! Please remember your new password.',
      acc_sec_wrong_old_pwd: 'Current password is incorrect!',
      acc_sec_pwd_mismatch: 'Confirmation password does not match!',
      acc_sec_switch_other: 'Switch to another account',
      google_login_title: 'Sign in with Google',
      google_login_sub: 'to continue to MYLIFE Productivity Workspace',
      google_label_email: 'Google Email or Username',
      google_label_password: 'Enter your Google password',
      google_btn_login: 'Authenticate & Sign In',
      google_btn_login_bar: 'Sign in with Google',
      google_btn_quick: 'Quick Sign In with Google'
    }
  };

  let currentLang = localStorage.getItem('mylife_language') || 'vi';

  // State variables scoped per active account
  let tasks = [];
  let projects = [];
  let taskSettings = {};
  let transactions = [];
  let healthData = {};
  let financePin = '1234';
  let financeUnlocked = false;

  /* ============================================================
   * 0. ACCOUNT MANAGEMENT & MULTI-ACCOUNT CONTROLLER (UP TO 20 ACCOUNTS)
   * ============================================================ */
  const DEFAULT_ACCOUNTS = [
    {
      id: 'acc-1',
      name: 'Anh Dũng',
      email: 'anhdung.workspace@mylife.vn',
      role: 'Chủ sở hữu',
      color: '#f25c54',
      initials: 'AD',
      password: '123',
      createdAt: '2026-01-01'
    },
    {
      id: 'acc-2',
      name: 'Mai Linh',
      email: 'mailinh.marketing@mylife.vn',
      role: 'Thành viên',
      color: '#2a9d8f',
      initials: 'ML',
      password: '123',
      createdAt: '2026-02-15'
    },
    {
      id: 'acc-3',
      name: 'Trần Quốc',
      email: 'quoc.tran@mylife.vn',
      role: 'Quản trị viên',
      color: '#4361ee',
      initials: 'TQ',
      password: '123',
      createdAt: '2026-03-10'
    }
  ];

  let savedAccounts = [];
  try {
    const rawAccs = localStorage.getItem('mylife_accounts');
    if (rawAccs) {
      savedAccounts = JSON.parse(rawAccs);
    }
  } catch (e) {
    console.warn('Error loading accounts:', e);
  }

  if (!Array.isArray(savedAccounts) || savedAccounts.length === 0) {
    savedAccounts = [...DEFAULT_ACCOUNTS];
    localStorage.setItem('mylife_accounts', JSON.stringify(savedAccounts));
  }

  // Ensure all accounts have a password field (security safeguard)
  savedAccounts.forEach(acc => {
    if (!acc.password) acc.password = '123456';
  });

  let activeAccountId = localStorage.getItem('mylife_active_account_id') || savedAccounts[0].id;
  if (!savedAccounts.some(a => a.id === activeAccountId)) {
    activeAccountId = savedAccounts[0].id;
    localStorage.setItem('mylife_active_account_id', activeAccountId);
  }

  function getActiveAccount() {
    return savedAccounts.find(a => a.id === activeAccountId) || savedAccounts[0];
  }

  function saveAccountsData() {
    localStorage.setItem('mylife_accounts', JSON.stringify(savedAccounts));
    localStorage.setItem('mylife_active_account_id', activeAccountId);
  }

  function computeInitials(fullName) {
    if (!fullName) return 'U';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function getLocalizedRole(roleStr) {
    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
    if (!isEn) return roleStr;
    if (roleStr === 'Chủ sở hữu') return 'Owner';
    if (roleStr === 'Quản trị viên') return 'Admin';
    if (roleStr === 'Thành viên') return 'Member';
    if (roleStr === 'Cá nhân') return 'Personal';
    return roleStr;
  }

  /* ============================================================
   * ISOLATED ACCOUNT DATA CONTROLLER (CÔ LẬP DỮ LIỆU RIÊNG TỪNG TÀI KHOẢN)
   * ============================================================ */
  function getAccountDataKey(subKey, accId) {
    const id = accId || activeAccountId || 'acc-1';
    return `mylife_${id}_${subKey}`;
  }

  function getInitialProjectsForAccount(accId) {
    if (accId === 'acc-1') {
      const raw = localStorage.getItem('mylife_projects');
      if (raw) {
        try { return JSON.parse(raw); } catch(e) {}
      }
      return [
        { id: 'proj-1', name: 'Design System & UI', color: 'pink' },
        { id: 'proj-2', name: 'API & Backend', color: 'sky' },
        { id: 'proj-3', name: 'Marketing & SEO', color: 'emerald' },
        { id: 'proj-4', name: 'Chiến Lược & Pitch Deck', color: 'amber' },
        { id: 'proj-5', name: 'Cá nhân & Thói quen', color: 'purple' }
      ];
    }
    if (accId === 'acc-2') {
      return [
        { id: 'proj-ml-1', name: 'Chiến Lược & Marketing', color: 'pink' },
        { id: 'proj-ml-2', name: 'Sáng Tạo Nội Dung & Video', color: 'sky' },
        { id: 'proj-ml-3', name: 'Quan Hệ Đối Tác & PR', color: 'emerald' },
        { id: 'proj-ml-4', name: 'Thói Quen & Phát Triển', color: 'purple' }
      ];
    }
    if (accId === 'acc-3') {
      return [
        { id: 'proj-tq-1', name: 'Hạ Tầng Cloud & DevOps', color: 'sky' },
        { id: 'proj-tq-2', name: 'Hệ Thống Backend & API', color: 'emerald' },
        { id: 'proj-tq-3', name: 'Bảo Mật & Phân Quyền', color: 'amber' },
        { id: 'proj-tq-4', name: 'Nghiên Cứu AI Agent', color: 'purple' }
      ];
    }
    return [
      { id: 'proj-custom-1', name: 'Công Việc & Dự Án', color: 'sky' },
      { id: 'proj-custom-2', name: 'Cá Nhân & Thói Quen', color: 'emerald' },
      { id: 'proj-custom-3', name: 'Mục Tiêu & Học Tập', color: 'pink' }
    ];
  }

  function getInitialTasksForAccount(accId) {
    if (accId === 'acc-1') {
      const raw = localStorage.getItem('mylife_tasks');
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch(e) {}
      }
      if (typeof SAMPLE_PAPER_TASKS !== 'undefined' && Array.isArray(SAMPLE_PAPER_TASKS)) {
        return SAMPLE_PAPER_TASKS.map(t => ({
          ...t,
          id: t.id || Date.now() + Math.floor(Math.random() * 1000)
        }));
      }
      return [];
    }
    if (accId === 'acc-2') {
      return [
        { id: 3001, title: 'Lên kế hoạch phát sóng video TikTok & Reels Q4', description: 'Chuẩn bị lịch đăng 15 video ngắn và kịch bản hook giữ chân người xem 3s đầu.', project: 'Sáng Tạo Nội Dung & Video', priority: 'high', status: 'todo', deadline: '2026-11-10T09:00', scheduleDay: 2, scheduleHour: 9, pillColor: 'pill-pink', accentColor: 'pink', subtasks: [{ id: 1, text: 'Quay 5 clip demo', completed: true }, { id: 2, text: 'Duyệt âm thanh bản quyền', completed: false }], completed: false },
        { id: 3002, title: 'Họp duyệt chiến dịch thương hiệu cuối năm', description: 'Trình bày số liệu tăng trưởng tương tác và ngân sách chạy quảng cáo đa kênh.', project: 'Chiến Lược & Marketing', priority: 'urgent', status: 'doing', deadline: '2026-11-11T14:00', scheduleDay: 3, scheduleHour: 14, pillColor: 'pill-pink', accentColor: 'pink', subtasks: [{ id: 1, text: 'Slide báo cáo ROI', completed: true }], completed: false },
        { id: 3003, title: 'Gửi thư mời hợp tác & brief cho 10 Influencer', description: 'Liên hệ các kênh công nghệ để gửi sản phẩm trải nghiệm sớm.', project: 'Quan Hệ Đối Tác & PR', priority: 'medium', status: 'todo', deadline: '2026-11-12T11:00', scheduleDay: 4, scheduleHour: 11, pillColor: 'pill-mint', accentColor: 'emerald', subtasks: [], completed: false }
      ];
    }
    if (accId === 'acc-3') {
      return [
        { id: 4001, title: 'Nâng cấp cụm Kubernetes Cluster v1.31', description: 'Thực hiện rolling update trên các node worker và test canary release an toàn.', project: 'Hạ Tầng Cloud & DevOps', priority: 'urgent', status: 'doing', deadline: '2026-11-10T10:00', scheduleDay: 2, scheduleHour: 10, pillColor: 'pill-sky', accentColor: 'sky', subtasks: [{ id: 1, text: 'Backup snapshot etcd', completed: true }], completed: false },
        { id: 4002, title: 'Tối ưu hóa chỉ mục SQL & Redis Caching', description: 'Giảm thời gian phản hồi API xuống dưới 50ms cho trang tổng quan.', project: 'Hệ Thống Backend & API', priority: 'high', status: 'todo', deadline: '2026-11-12T13:00', scheduleDay: 4, scheduleHour: 13, pillColor: 'pill-mint', accentColor: 'emerald', subtasks: [], completed: false },
        { id: 4003, title: 'Thiết lập tường lửa WAF & Rate Limiting', description: 'Chống tấn công brute-force vào cổng đăng nhập hệ thống.', project: 'Bảo Mật & Phân Quyền', priority: 'medium', status: 'todo', deadline: '2026-11-13T15:00', scheduleDay: 5, scheduleHour: 15, pillColor: 'pill-amber', accentColor: 'amber', subtasks: [], completed: false }
      ];
    }
    // Tài khoản mới / tài khoản tùy biến: ĐỂ TRẮNG TOÀN BỘ (100% BLANK)
    return [];
  }

  function getInitialTransactionsForAccount(accId) {
    if (accId === 'acc-1') {
      const raw = localStorage.getItem('mylife_transactions_v2');
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) return parsed;
        } catch(e) {}
      }
      return [];
    }
    if (accId === 'acc-2') {
      return [
        { id: 301, type: 'income', amount: 22000000, category: 'Lương & Thưởng', note: 'Lương Marketing Lead tháng 10', date: '2026-11-05T09:00:00' },
        { id: 302, type: 'expense', amount: 450000, category: 'Ăn uống', note: 'Cà phê & bánh ngọt làm việc', date: '2026-11-06T14:30:00' },
        { id: 303, type: 'expense', amount: 1500000, category: 'Học tập & Công việc', note: 'Đăng ký Canva Pro & CapCut', date: '2026-11-07T11:00:00' }
      ];
    }
    if (accId === 'acc-3') {
      return [
        { id: 401, type: 'income', amount: 35000000, category: 'Lương & Thưởng', note: 'Lương Senior DevOps & Cloud Lead', date: '2026-11-05T09:00:00' },
        { id: 402, type: 'expense', amount: 3200000, category: 'Nhà ở & Hóa đơn', note: 'Thuê cụm máy chủ Cloud Server VPS', date: '2026-11-06T10:00:00' },
        { id: 403, type: 'expense', amount: 1100000, category: 'Mua sắm', note: 'Bàn phím cơ lập trình & phụ kiện cáp', date: '2026-11-07T16:45:00' }
      ];
    }
    return [];
  }

  function getInitialHealthDataForAccount(accId) {
    const nowD = new Date();
    const dStr = `${nowD.getFullYear()}-${String(nowD.getMonth()+1).padStart(2,'0')}-${String(nowD.getDate()).padStart(2,'0')}`;
    if (accId === 'acc-1') {
      const raw = localStorage.getItem('mylife_health_data');
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === 'object') return parsed;
        } catch(e) {}
      }
    }
    if (accId === 'acc-2') {
      return {
        steps: 6450,
        stepsTarget: 10000,
        waterIntakeMl: 1250,
        waterTargetMl: 2000,
        waterReminderEnabled: true,
        waterReminderIntervalMins: 60,
        lastWaterTime: Date.now() - 35 * 60 * 1000,
        sleepHours: 7.0,
        sleepTargetHours: 8.0,
        bedtime: '23:30',
        wakeTime: '06:30',
        sleepQualityScore: 88,
        sleepReminderEnabled: true,
        lastActiveDate: dStr,
        dailyLogs: {
          [dStr]: {
            steps: 6450,
            calories: 258,
            water: 1250,
            sleep: 7.0,
            bedtime: '23:30',
            wakeTime: '06:30'
          }
        }
      };
    }
    if (accId === 'acc-3') {
      return {
        steps: 5200,
        stepsTarget: 10000,
        waterIntakeMl: 1500,
        waterTargetMl: 2000,
        waterReminderEnabled: true,
        waterReminderIntervalMins: 60,
        lastWaterTime: Date.now() - 40 * 60 * 1000,
        sleepHours: 6.5,
        sleepTargetHours: 8.0,
        bedtime: '00:30',
        wakeTime: '07:00',
        sleepQualityScore: 82,
        sleepReminderEnabled: true,
        lastActiveDate: dStr,
        dailyLogs: {
          [dStr]: {
            steps: 5200,
            calories: 208,
            water: 1500,
            sleep: 6.5,
            bedtime: '00:30',
            wakeTime: '07:00'
          }
        }
      };
    }
    // Tài khoản mới: Để trắng toàn bộ (0 bước, 0 calo, 0 nước, 0 giờ ngủ, không tự điền giờ ngủ/dậy)
    return {
      steps: 0,
      stepsTarget: 10000,
      waterIntakeMl: 0,
      waterTargetMl: 2000,
      waterReminderEnabled: true,
      waterReminderIntervalMins: 60,
      lastWaterTime: Date.now(),
      sleepHours: 0,
      sleepTargetHours: 8.0,
      bedtime: '',
      wakeTime: '',
      sleepQualityScore: 0,
      sleepReminderEnabled: true,
      lastActiveDate: dStr,
      dailyLogs: {}
    };
  }

  function loadAccountData(targetId) {
    const accId = targetId || activeAccountId || 'acc-1';

    // 1. Projects
    const projKey = getAccountDataKey('projects', accId);
    const rawProj = localStorage.getItem(projKey);
    if (rawProj) {
      try { projects = JSON.parse(rawProj); } catch(e) { projects = getInitialProjectsForAccount(accId); }
    } else {
      projects = getInitialProjectsForAccount(accId);
      localStorage.setItem(projKey, JSON.stringify(projects));
    }

    // 2. Task Settings
    const settingsKey = getAccountDataKey('task_settings', accId);
    const rawSettings = localStorage.getItem(settingsKey);
    if (rawSettings) {
      try { taskSettings = JSON.parse(rawSettings); } catch(e) { taskSettings = { ...defaultTaskSettings }; }
    } else {
      taskSettings = { cutoffHour: 22, cutoffMinute: 0, dailyTarget: 5, pomoLength: 25 };
      localStorage.setItem(settingsKey, JSON.stringify(taskSettings));
    }

    // 3. Tasks
    const tasksKey = getAccountDataKey('tasks', accId);
    const rawTasksStr = localStorage.getItem(tasksKey);
    if (rawTasksStr) {
      try {
        let parsed = JSON.parse(rawTasksStr);
        if (Array.isArray(parsed)) {
          // Xóa bỏ thẻ khởi tạo mẫu 'Bắt đầu ngày mới cùng MYLIFE' trên các tài khoản mới nếu có
          if (accId !== 'acc-1' && accId !== 'acc-2' && accId !== 'acc-3') {
            parsed = parsed.filter(t => t.title !== 'Bắt đầu ngày mới cùng MYLIFE');
          }
          tasks = parsed;
        } else {
          tasks = [];
        }
      } catch(e) { tasks = []; }
    } else {
      tasks = getInitialTasksForAccount(accId);
      localStorage.setItem(tasksKey, JSON.stringify(tasks));
    }

    // 4. Finance Transactions & PIN
    const transKey = getAccountDataKey('transactions', accId);
    const rawTrans = localStorage.getItem(transKey);
    if (rawTrans) {
      try { transactions = JSON.parse(rawTrans); } catch(e) { transactions = []; }
    } else {
      transactions = getInitialTransactionsForAccount(accId);
      localStorage.setItem(transKey, JSON.stringify(transactions));
    }

    const pinKey = getAccountDataKey('finance_pin', accId);
    const rawPin = localStorage.getItem(pinKey);
    financePin = rawPin || (typeof DEFAULT_PW !== 'undefined' ? DEFAULT_PW : '1234');
    financeUnlocked = false; // Luôn khóa bảo mật phân hệ tài chính khi đổi tài khoản
    sessionStorage.removeItem('mylife_finance_unlocked');

    // 5. Health Data
    const healthKey = getAccountDataKey('health_data', accId);
    const rawHealth = localStorage.getItem(healthKey);
    if (rawHealth) {
      try {
        healthData = JSON.parse(rawHealth);
        // Dọn dẹp dữ liệu giấc ngủ tự điền 7.5h cho tài khoản mới chưa từng ghi nhận
        if (accId !== 'acc-1' && accId !== 'acc-2' && accId !== 'acc-3') {
          const hasRealSleepLogs = healthData.dailyLogs && Object.keys(healthData.dailyLogs).some(k => healthData.dailyLogs[k]?.sleep > 0);
          if (!hasRealSleepLogs && (healthData.sleepHours === 7.5 || healthData.sleepHours === 7 || healthData.bedtime === '23:00')) {
            healthData.sleepHours = 0;
            healthData.bedtime = '';
            healthData.wakeTime = '';
            healthData.sleepQualityScore = 0;
            if (healthData.dailyLogs) {
              Object.keys(healthData.dailyLogs).forEach(k => {
                if (healthData.dailyLogs[k]) {
                  healthData.dailyLogs[k].sleep = null;
                  healthData.dailyLogs[k].bedtime = null;
                  healthData.dailyLogs[k].wakeTime = null;
                }
              });
            }
          }
        }
      } catch(e) { healthData = getInitialHealthDataForAccount(accId); }
    } else {
      healthData = getInitialHealthDataForAccount(accId);
      localStorage.setItem(healthKey, JSON.stringify(healthData));
    }

    // 6. AI Copilot Chat
    chatConversation = [];
    const chatKey = getAccountDataKey('ai_chat', accId);
    const rawChat = localStorage.getItem(chatKey);
    if (rawChat) {
      try { chatConversation = JSON.parse(rawChat); } catch(e) { chatConversation = []; }
    }

    // 7. Refresh all UI views
    if (typeof populateProjectDropdowns === 'function') populateProjectDropdowns();
    if (typeof renderTasks === 'function') renderTasks();
    if (typeof renderWeeklySchedule === 'function') renderWeeklySchedule();
    if (typeof render2ColBoard === 'function') render2ColBoard();
    if (typeof renderDeepTasksView === 'function') renderDeepTasksView();
    if (typeof updateCountdownTimer === 'function') updateCountdownTimer();
    if (typeof applyLockState === 'function') applyLockState();
    if (typeof renderAllFinanceViews === 'function' && financeUnlocked) renderAllFinanceViews();
    if (typeof renderFinanceOverviewCard === 'function') renderFinanceOverviewCard();
    if (typeof updateHealth === 'function') updateHealth();
    if (typeof renderInitialWelcomeMessage === 'function') renderInitialWelcomeMessage();
    if (typeof renderSmartNotifications === 'function') renderSmartNotifications();

    // Pilot dữ liệu mới: không đọc bất kỳ dữ liệu cloud cũ nào khi đăng nhập.
    // Dữ liệu cục bộ vừa khởi tạo sẽ được đồng bộ lên document UID sau khi xác thực.
  }

  function renderAccountUI() {
    const activeAcc = getActiveAccount();
    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');

    // 1. Header avatar pill
    const headerInitials = document.getElementById('header-avatar-initials');
    const headerName = document.getElementById('header-avatar-name');
    if (headerInitials && activeAcc) {
      headerInitials.textContent = activeAcc.initials || computeInitials(activeAcc.name);
      headerInitials.style.backgroundColor = activeAcc.color || '#f25c54';
    }
    if (headerName && activeAcc) {
      headerName.textContent = activeAcc.name;
    }

    // 2. Active Account Card inside Dropdown
    const activeAccAvatar = document.getElementById('active-acc-avatar');
    const activeAccName = document.getElementById('active-acc-name');
    const activeAccRole = document.getElementById('active-acc-role');
    const activeAccEmail = document.getElementById('active-acc-email');

    if (activeAccAvatar && activeAcc) {
      activeAccAvatar.textContent = activeAcc.initials || computeInitials(activeAcc.name);
      activeAccAvatar.style.backgroundColor = activeAcc.color || '#f25c54';
    }
    if (activeAccName && activeAcc) {
      activeAccName.textContent = activeAcc.name;
    }
    if (activeAccRole && activeAcc) {
      activeAccRole.textContent = getLocalizedRole(activeAcc.role);
    }
    if (activeAccEmail && activeAcc) {
      activeAccEmail.textContent = activeAcc.email;
    }

    // 3. Counter Badge (Up to 20 accounts)
    const counterBadge = document.getElementById('account-count-badge');
    if (counterBadge) {
      counterBadge.textContent = isEn
        ? `Saved: ${savedAccounts.length}/20 accounts`
        : `Đã lưu: ${savedAccounts.length}/20 tài khoản`;
    }

    // 4. Other accounts list with security lock indicator
    const switchList = document.getElementById('accounts-switch-list');
    if (switchList) {
      const otherAccounts = savedAccounts.filter(a => a.id !== activeAccountId);
      if (otherAccounts.length === 0) {
        switchList.innerHTML = `
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-dashed border-slate-300 dark:border-slate-700 text-center text-[11px] text-slate-400 font-semibold">
            ${isEn ? 'No other accounts saved yet (supports up to 20)' : 'Chưa có tài khoản phụ khác (hỗ trợ tối đa 20)'}
          </div>
        `;
      } else {
        switchList.innerHTML = otherAccounts.map(acc => `
          <div class="p-2 rounded-xl bg-white dark:bg-slate-800/90 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-between gap-2 shadow-[1px_1px_0px_#1e293b] hover:border-teal-500 transition-colors">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="relative w-8 h-8 rounded-lg text-white font-black text-xs flex items-center justify-center shrink-0 border border-slate-900 shadow-[1px_1px_0px_#1e293b]" style="background-color: ${acc.color || '#4361ee'};">
                ${acc.initials || computeInitials(acc.name)}
                <span class="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border border-slate-900 flex items-center justify-center text-[7px] text-slate-900" title="${isEn ? 'Protected by PIN/Password' : 'Được bảo vệ bởi PIN/Mật khẩu'}">
                  <i class="fa-solid fa-lock"></i>
                </span>
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-1.5 truncate">
                  <span class="font-extrabold text-xs text-slate-900 dark:text-white truncate">${acc.name}</span>
                  <span class="text-[9px] px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold border border-slate-300 dark:border-slate-600">${getLocalizedRole(acc.role)}</span>
                </div>
                <div class="text-[10px] text-slate-400 truncate">${acc.email}</div>
              </div>
            </div>
            <div class="flex items-center gap-1 shrink-0">
              <button type="button" class="btn-switch-account px-2.5 py-1 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-900 font-black text-[11px] border border-slate-900 shadow-[1px_1px_0px_#1e293b] active:scale-95 transition-all flex items-center gap-1" data-acc-id="${acc.id}" title="${isEn ? 'Authenticate & Switch' : 'Xác thực & Chuyển sang'}">
                <i class="fa-solid fa-key text-[9px]"></i>
                <span>${isEn ? 'Switch' : 'Chuyển'}</span>
              </button>
              <button type="button" class="btn-delete-account p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs transition-colors" data-acc-id="${acc.id}" title="${isEn ? 'Remove account' : 'Xóa tài khoản'}">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        `).join('');
      }
    }
  }

  function toggleAccountDropdown(show) {
    const dropdown = document.getElementById('dropdown-account-manager');
    const chevron = document.getElementById('icon-account-chevron');
    if (!dropdown) return;
    const isOpening = (show !== undefined) ? show : dropdown.classList.contains('hidden');
    if (isOpening) {
      dropdown.classList.remove('hidden');
      if (chevron) chevron.classList.add('rotate-180');
      renderAccountUI();
    } else {
      dropdown.classList.add('hidden');
      if (chevron) chevron.classList.remove('rotate-180');
    }
  }

  /* --- BẢO MẬT & XÁC THỰC DANH TÍNH KHI CHUYỂN TÀI KHOẢN --- */
  let pendingSwitchAccountId = null;

  function openAuthSwitchModal(targetAccId) {
    const targetAcc = savedAccounts.find(a => a.id === targetAccId);
    if (!targetAcc) return;
    pendingSwitchAccountId = targetAccId;

    const modal = document.getElementById('modal-auth-switch-account');
    const avatarEl = document.getElementById('auth-switch-avatar');
    const nameEl = document.getElementById('auth-switch-target-name');
    const pwdInput = document.getElementById('input-auth-switch-password');
    const errEl = document.getElementById('auth-switch-error-msg');

    if (avatarEl) {
      avatarEl.textContent = targetAcc.initials || computeInitials(targetAcc.name);
      avatarEl.style.backgroundColor = targetAcc.color || '#4361ee';
    }
    if (nameEl) nameEl.textContent = targetAcc.name;
    if (pwdInput) {
      pwdInput.value = '';
      pwdInput.type = 'password';
    }
    if (errEl) errEl.classList.add('hidden');

    const eyeIcon = document.getElementById('icon-switch-eye');
    if (eyeIcon) eyeIcon.className = 'fa-solid fa-eye';

    toggleAccountDropdown(false);
    if (modal) {
      modal.classList.remove('hidden');
      setTimeout(() => pwdInput?.focus(), 100);
    }
  }

  function closeAuthSwitchModal() {
    const modal = document.getElementById('modal-auth-switch-account');
    if (modal) modal.classList.add('hidden');
    pendingSwitchAccountId = null;
    const pwdInput = document.getElementById('input-auth-switch-password');
    if (pwdInput) pwdInput.value = '';
    const errEl = document.getElementById('auth-switch-error-msg');
    if (errEl) errEl.classList.add('hidden');
  }

  function verifyAndSwitchAccount(enteredPassword) {
    if (!pendingSwitchAccountId) return;
    const targetAcc = savedAccounts.find(a => a.id === pendingSwitchAccountId);
    if (!targetAcc) return;

    const authenticatedUser = window.MyLifeFirebase?.auth?.currentUser;
    if (!authenticatedUser || !targetAcc.uid ||
        authenticatedUser.uid !== targetAcc.uid) {
      alert('Bản thử nghiệm nhiều người dùng chỉ cho phép sử dụng tài khoản Google đang xác thực. Hãy đăng nhập bằng Google để chuyển tài khoản.');
      closeAuthSwitchModal();
      return false;
    }

    const expectedPwd = String(targetAcc.password || '123456').trim();
    if (String(enteredPassword).trim() !== expectedPwd) {
      const errEl = document.getElementById('auth-switch-error-msg');
      if (errEl) errEl.classList.remove('hidden');
      const inputEl = document.getElementById('input-auth-switch-password');
      if (inputEl) {
        inputEl.classList.add('ring-2', 'ring-rose-500', 'border-rose-500');
        inputEl.focus();
        setTimeout(() => inputEl.classList.remove('ring-2', 'ring-rose-500', 'border-rose-500'), 1500);
      }
      return false;
    }

    // Mật khẩu chính xác -> Chuyển sang tài khoản
    activeAccountId = targetAcc.id;
    saveAccountsData();
    renderAccountUI();
    updateClock();
    loadAccountData(activeAccountId);
    closeAuthSwitchModal();

    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
    const msg = isEn ? `Switched to account: ${targetAcc.name}` : `Đã chuyển sang tài khoản: ${targetAcc.name}`;
    if (typeof showHint === 'function') showHint(msg);
    return true;
  }

  function removeAccount(accId) {
    if (savedAccounts.length <= 1) {
      const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
      alert(isEn ? 'You must keep at least 1 account!' : 'Bạn phải giữ lại ít nhất 1 tài khoản hoạt động!');
      return;
    }
    const target = savedAccounts.find(a => a.id === accId);
    if (!target) return;
    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
    const confirmMsg = isEn 
      ? `Are you sure you want to remove account "${target.name}"?` 
      : `Bạn có chắc muốn xóa tài khoản "${target.name}" khỏi danh sách đăng nhập?`;
    if (!confirm(confirmMsg)) return;

    savedAccounts = savedAccounts.filter(a => a.id !== accId);
    if (activeAccountId === accId) {
      activeAccountId = savedAccounts[0].id;
      loadAccountData(activeAccountId);
    }
    saveAccountsData();
    renderAccountUI();
    updateClock();
    const msg = isEn ? `Removed account: ${target.name}` : `Đã xóa tài khoản: ${target.name}`;
    if (typeof showHint === 'function') showHint(msg);
  }

  // Account Dropdown & Modal Elements & Listeners
  const btnHeaderAccount = document.getElementById('btn-header-account-profile');
  btnHeaderAccount?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleAccountDropdown();
  });

  const btnCloseAccDropdown = document.getElementById('btn-close-account-dropdown');
  btnCloseAccDropdown?.addEventListener('click', () => {
    toggleAccountDropdown(false);
  });

  document.addEventListener('click', (e) => {
    const wrapper = document.getElementById('account-dropdown-wrapper');
    const dropdown = document.getElementById('dropdown-account-manager');
    if (dropdown && !dropdown.classList.contains('hidden')) {
      if (wrapper && !wrapper.contains(e.target)) {
        toggleAccountDropdown(false);
      }
    }
  });

  const switchListContainer = document.getElementById('accounts-switch-list');
  switchListContainer?.addEventListener('click', (e) => {
    const switchBtn = e.target.closest('.btn-switch-account');
    if (switchBtn) {
      const accId = switchBtn.dataset.accId;
      if (accId) openAuthSwitchModal(accId); // Yêu cầu xác thực mật khẩu
      return;
    }
    const delBtn = e.target.closest('.btn-delete-account');
    if (delBtn) {
      const accId = delBtn.dataset.accId;
      if (accId) removeAccount(accId);
      return;
    }
  });

  // Modal Xác Thực Đăng Nhập / Chuyển Tài Khoản
  const formAuthSwitch = document.getElementById('form-auth-switch-account');
  formAuthSwitch?.addEventListener('submit', (e) => {
    e.preventDefault();
    const pwdInput = document.getElementById('input-auth-switch-password');
    const val = pwdInput ? pwdInput.value : '';
    verifyAndSwitchAccount(val);
  });

  document.getElementById('btn-cancel-auth-switch')?.addEventListener('click', closeAuthSwitchModal);
  document.getElementById('modal-auth-switch-account')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal-auth-switch-account') closeAuthSwitchModal();
  });

  document.getElementById('btn-toggle-switch-pwd-visibility')?.addEventListener('click', () => {
    const pwdInput = document.getElementById('input-auth-switch-password');
    const eyeIcon = document.getElementById('icon-switch-eye');
    if (!pwdInput) return;
    if (pwdInput.type === 'password') {
      pwdInput.type = 'text';
      if (eyeIcon) eyeIcon.className = 'fa-solid fa-eye-slash text-teal-600';
    } else {
      pwdInput.type = 'password';
      if (eyeIcon) eyeIcon.className = 'fa-solid fa-eye';
    }
  });

  // Modal Đổi Mật Khẩu / PIN
  const modalChangePwd = document.getElementById('modal-change-password');
  const btnOpenChangePwd = document.getElementById('btn-open-change-pwd-modal');
  const btnCloseChangePwd = document.getElementById('btn-close-change-pwd-modal');
  const btnCancelChangePwd = document.getElementById('btn-cancel-change-pwd');
  const formChangePwd = document.getElementById('form-change-password');

  function openChangePwdModal() {
    toggleAccountDropdown(false);
    if (modalChangePwd) {
      modalChangePwd.classList.remove('hidden');
      formChangePwd?.reset();
      document.getElementById('change-pwd-error-msg')?.classList.add('hidden');
      setTimeout(() => document.getElementById('input-old-pwd')?.focus(), 100);
    }
  }

  function closeChangePwdModal() {
    if (modalChangePwd) modalChangePwd.classList.add('hidden');
    formChangePwd?.reset();
  }

  btnOpenChangePwd?.addEventListener('click', openChangePwdModal);
  btnCloseChangePwd?.addEventListener('click', closeChangePwdModal);
  btnCancelChangePwd?.addEventListener('click', closeChangePwdModal);
  modalChangePwd?.addEventListener('click', (e) => {
    if (e.target === modalChangePwd) closeChangePwdModal();
  });

  formChangePwd?.addEventListener('submit', (e) => {
    e.preventDefault();
    const activeAcc = getActiveAccount();
    if (!activeAcc) return;

    const oldPwd = document.getElementById('input-old-pwd')?.value || '';
    const newPwd = document.getElementById('input-new-pwd')?.value || '';
    const confirmPwd = document.getElementById('input-confirm-pwd')?.value || '';
    const errBox = document.getElementById('change-pwd-error-msg');
    const errText = document.getElementById('change-pwd-error-text');
    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');

    const curPwd = String(activeAcc.password || '123456');
    if (oldPwd !== curPwd) {
      if (errBox && errText) {
        errText.textContent = isEn ? 'Current password is incorrect!' : 'Mật khẩu hiện tại không đúng!';
        errBox.classList.remove('hidden');
      }
      return;
    }

    if (newPwd.length < 4) {
      if (errBox && errText) {
        errText.textContent = isEn ? 'New password must be at least 4 characters!' : 'Mật khẩu mới phải từ 4 ký tự trở lên!';
        errBox.classList.remove('hidden');
      }
      return;
    }

    if (newPwd !== confirmPwd) {
      if (errBox && errText) {
        errText.textContent = isEn ? 'Confirmation password does not match!' : 'Mật khẩu xác nhận không khớp!';
        errBox.classList.remove('hidden');
      }
      return;
    }

    activeAcc.password = newPwd;
    saveAccountsData();
    closeChangePwdModal();
    const succMsg = isEn 
      ? 'Password updated successfully! Please remember your new password.' 
      : 'Đổi mật khẩu thành công! Hãy ghi nhớ mật khẩu mới để đăng nhập.';
    if (typeof showHint === 'function') showHint(succMsg);
  });

  // Khóa Phiên Làm Việc / Đăng Xuất (Lock Screen Overlay)
  const screenLocked = document.getElementById('screen-account-locked');
  const btnLockSession = document.getElementById('btn-lock-account-session');
  const formUnlockSession = document.getElementById('form-unlock-session');
  const btnLockScreenSwitch = document.getElementById('btn-lock-screen-switch-other');

  function lockSession() {
    toggleAccountDropdown(false);
    const activeAcc = getActiveAccount();
    if (!activeAcc) return;

    const avatarEl = document.getElementById('lock-screen-avatar');
    const nameEl = document.getElementById('lock-screen-user-name');
    const pwdInput = document.getElementById('input-unlock-password');
    const errEl = document.getElementById('unlock-session-error-msg');

    if (avatarEl) {
      avatarEl.textContent = activeAcc.initials || computeInitials(activeAcc.name);
      avatarEl.style.backgroundColor = activeAcc.color || '#f25c54';
    }
    if (nameEl) nameEl.textContent = activeAcc.name;
    if (pwdInput) {
      pwdInput.value = '';
      pwdInput.type = 'password';
    }
    if (errEl) errEl.classList.add('hidden');

    if (screenLocked) {
      screenLocked.classList.remove('hidden');
      setTimeout(() => pwdInput?.focus(), 100);
    }
    sessionStorage.setItem('mylife_session_locked', 'true');
  }

  function unlockSession(enteredPassword) {
    const activeAcc = getActiveAccount();
    if (!activeAcc) return;

    const expectedPwd = String(activeAcc.password || '123456').trim();
    if (String(enteredPassword).trim() !== expectedPwd) {
      const errEl = document.getElementById('unlock-session-error-msg');
      if (errEl) errEl.classList.remove('hidden');
      const inputEl = document.getElementById('input-unlock-password');
      if (inputEl) {
        inputEl.classList.add('ring-2', 'ring-rose-500', 'border-rose-500');
        inputEl.focus();
        setTimeout(() => inputEl.classList.remove('ring-2', 'ring-rose-500', 'border-rose-500'), 1500);
      }
      return;
    }

    if (screenLocked) screenLocked.classList.add('hidden');
    sessionStorage.removeItem('mylife_session_locked');
    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
    const msg = isEn ? `Welcome back, ${activeAcc.name}!` : `Chào mừng trở lại, ${activeAcc.name}!`;
    if (typeof showHint === 'function') showHint(msg);
  }

  btnLockSession?.addEventListener('click', async () => {
    const auth = window.MyLifeFirebase?.auth;
    if (auth?.currentUser) {
      try {
        sessionStorage.removeItem('mylife_session_locked');
        await auth.signOut();
        // onAuthStateChanged sẽ đưa người dùng về màn hình đăng nhập.
      } catch (err) {
        console.error('[MyLife] Lỗi đăng xuất Firebase:', err);
        alert('Không thể đăng xuất lúc này. Vui lòng thử lại.');
      }
      return;
    }
    lockSession();
  });

  formUnlockSession?.addEventListener('submit', (e) => {
    e.preventDefault();
    const pwdInput = document.getElementById('input-unlock-password');
    unlockSession(pwdInput ? pwdInput.value : '');
  });

  document.getElementById('btn-toggle-unlock-pwd-visibility')?.addEventListener('click', () => {
    const pwdInput = document.getElementById('input-unlock-password');
    const eyeIcon = document.getElementById('icon-unlock-eye');
    if (!pwdInput) return;
    if (pwdInput.type === 'password') {
      pwdInput.type = 'text';
      if (eyeIcon) eyeIcon.className = 'fa-solid fa-eye-slash text-teal-600';
    } else {
      pwdInput.type = 'password';
      if (eyeIcon) eyeIcon.className = 'fa-solid fa-eye';
    }
  });

  btnLockScreenSwitch?.addEventListener('click', () => {
    if (screenLocked) screenLocked.classList.add('hidden');
    toggleAccountDropdown(true);
  });

  // Modal Thêm Tài Khoản Mới
  const modalAddAccount = document.getElementById('modal-add-account');
  const btnOpenAddAccount = document.getElementById('btn-open-add-account-modal');
  const btnCloseAddAccount = document.getElementById('btn-close-add-account-modal');
  const btnCancelAddAccount = document.getElementById('btn-cancel-add-account');
  const formAddAccount = document.getElementById('form-add-account');
  let selectedAvatarColor = '#4361ee';

  const colorPickerContainer = document.getElementById('acc-avatar-color-picker');
  colorPickerContainer?.addEventListener('click', (e) => {
    const dot = e.target.closest('.color-picker-dot');
    if (!dot) return;
    const color = dot.dataset.color;
    if (color) {
      selectedAvatarColor = color;
      colorPickerContainer.querySelectorAll('.color-picker-dot').forEach(d => {
        d.classList.remove('ring-2', 'ring-indigo-500', 'selected');
      });
      dot.classList.add('ring-2', 'ring-indigo-500', 'selected');
    }
  });

  function openAddAccountModal() {
    if (savedAccounts.length >= 20) {
      const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
      alert(isEn ? 'Maximum limit of 20 accounts reached!' : 'Đã đạt giới hạn tối đa 20 tài khoản!');
      return;
    }
    if (modalAddAccount) {
      modalAddAccount.classList.remove('hidden');
      document.getElementById('input-acc-name')?.focus();
    }
    toggleAccountDropdown(false);
  }

  function closeAddAccountModal() {
    if (modalAddAccount) modalAddAccount.classList.add('hidden');
    formAddAccount?.reset();
  }

  btnOpenAddAccount?.addEventListener('click', openAddAccountModal);
  btnCloseAddAccount?.addEventListener('click', closeAddAccountModal);
  btnCancelAddAccount?.addEventListener('click', closeAddAccountModal);
  modalAddAccount?.addEventListener('click', (e) => {
    if (e.target === modalAddAccount) closeAddAccountModal();
  });

  formAddAccount?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (savedAccounts.length >= 20) {
      const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
      alert(isEn ? 'Maximum limit of 20 accounts reached!' : 'Đã đạt giới hạn tối đa 20 tài khoản!');
      return;
    }

    const nameInput = document.getElementById('input-acc-name');
    const emailInput = document.getElementById('input-acc-email');
    const pwdInput = document.getElementById('input-acc-password');
    const roleSelect = document.getElementById('select-acc-role');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const password = pwdInput ? pwdInput.value.trim() : '';
    const role = roleSelect ? roleSelect.value : 'Thành viên';

    if (!name || !email || !password) return;

    const newAcc = {
      id: 'acc-' + Date.now(),
      name: name,
      email: email,
      password: password,
      role: role,
      color: selectedAvatarColor || '#4361ee',
      initials: computeInitials(name),
      createdAt: new Date().toISOString()
    };

    savedAccounts.push(newAcc);
    activeAccountId = newAcc.id;
    saveAccountsData();
    renderAccountUI();
    updateClock();
    loadAccountData(activeAccountId);
    closeAddAccountModal();

    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
    const successMsg = isEn 
      ? `Successfully logged into new account: ${newAcc.name}!` 
      : `Đăng nhập thành công tài khoản mới: ${newAcc.name}!`;
    if (typeof showHint === 'function') showHint(successMsg);
  });

  // Khôi phục trạng thái khóa phiên nếu trước đó đã khóa
  if (sessionStorage.getItem('mylife_session_locked') === 'true') {
    lockSession();
  }

  // Render initial account UI state
  renderAccountUI();

  /* ============================================================
   * GOOGLE OAUTH & GOOGLE IDENTITY SIGN-IN GATEWAY
   * ============================================================ */
  const screenGoogleAuth = document.getElementById('screen-google-auth');
  const formGoogleAuth = document.getElementById('form-google-auth');
  const googleStepEmail = document.getElementById('google-auth-step-email');
  const googleStepPwd = document.getElementById('google-auth-step-password');
  const googleVerifying = document.getElementById('google-auth-verifying');
  const inputGoogleEmail = document.getElementById('input-google-email');
  const inputGooglePwd = document.getElementById('input-google-password');
  const displayChosenEmail = document.getElementById('google-display-chosen-email');
  const btnGoogleNext = document.getElementById('btn-google-next-step');
  const btnGoogleChangeEmail = document.getElementById('btn-google-change-email');
  const btnGoogleBackEmail = document.getElementById('btn-google-back-email');
  const btnGoogleBypass = document.getElementById('btn-google-bypass');
  const btnOpenGoogleLogin = document.getElementById('btn-open-google-login');
  const btnModalTriggerGoogle = document.getElementById('btn-modal-trigger-google');
  const btnToggleGooglePwdVis = document.getElementById('btn-toggle-google-pwd-visibility');
  const iconGooglePwdEye = document.getElementById('icon-google-pwd-eye');
  const googleEmailError = document.getElementById('google-email-error-msg');
  const googleAuthError = document.getElementById('google-auth-error-msg');
  const googleAuthErrorText = document.getElementById('google-auth-error-text');

  let currentGoogleEmailCandidate = '';

  function openGoogleAuthScreen(prefillEmail = '') {
    if (!screenGoogleAuth) return;
    toggleAccountDropdown(false);
    closeAddAccountModal();

    // Reset steps
    googleStepEmail?.classList.remove('hidden');
    googleStepPwd?.classList.add('hidden');
    googleVerifying?.classList.add('hidden');
    googleEmailError?.classList.add('hidden');
    googleAuthError?.classList.add('hidden');

    if (inputGoogleEmail) {
      inputGoogleEmail.value = prefillEmail;
    }
    if (inputGooglePwd) {
      inputGooglePwd.value = '';
    }

    screenGoogleAuth.classList.remove('hidden');
    setTimeout(() => {
      if (prefillEmail) {
        goToGooglePasswordStep(prefillEmail);
      } else {
        inputGoogleEmail?.focus();
      }
    }, 100);
  }

  function closeGoogleAuthScreen() {
    if (screenGoogleAuth) screenGoogleAuth.classList.add('hidden');
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function goToGooglePasswordStep(emailVal) {
    const email = (emailVal || inputGoogleEmail?.value || '').trim();
    if (!email || !isValidEmail(email)) {
      if (googleEmailError) googleEmailError.classList.remove('hidden');
      inputGoogleEmail?.classList.add('ring-2', 'ring-rose-500');
      setTimeout(() => inputGoogleEmail?.classList.remove('ring-2', 'ring-rose-500'), 1500);
      return;
    }

    if (googleEmailError) googleEmailError.classList.add('hidden');
    currentGoogleEmailCandidate = email;
    if (displayChosenEmail) displayChosenEmail.textContent = email;

    googleStepEmail?.classList.add('hidden');
    googleStepPwd?.classList.remove('hidden');
    googleAuthError?.classList.add('hidden');
    if (inputGooglePwd) {
      inputGooglePwd.value = '';
      setTimeout(() => inputGooglePwd.focus(), 100);
    }
  }

  btnGoogleNext?.addEventListener('click', () => {
    goToGooglePasswordStep();
  });

  inputGoogleEmail?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      goToGooglePasswordStep();
    }
  });

  btnGoogleChangeEmail?.addEventListener('click', () => {
    googleStepPwd?.classList.add('hidden');
    googleStepEmail?.classList.remove('hidden');
    inputGoogleEmail?.focus();
  });

  btnGoogleBackEmail?.addEventListener('click', () => {
    googleStepPwd?.classList.add('hidden');
    googleStepEmail?.classList.remove('hidden');
    inputGoogleEmail?.focus();
  });

  btnGoogleBypass?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    alert('Vui lòng đăng nhập bằng Google để sử dụng MyLife trong chế độ thử nghiệm nhiều người dùng.');
    openGoogleAuthScreen();
  }, true);

  btnOpenGoogleLogin?.addEventListener('click', () => {
    openGoogleAuthScreen();
  });

  btnModalTriggerGoogle?.addEventListener('click', () => {
    openGoogleAuthScreen();
  });

  // Đăng nhập nhanh bằng Firebase Google One-Click Popup
  const btnFbGooglePopup = document.getElementById('btn-firebase-google-popup');
  btnFbGooglePopup?.addEventListener('click', async () => {
    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
    if (!window.MyLifeFirebase || !window.MyLifeFirebase.isAvailable()) {
      alert(isEn ? 'Firebase is not initialized or network is blocked!' : 'Firebase chưa được kết nối hoặc mạng bị chặn!');
      return;
    }

    try {
      btnFbGooglePopup.disabled = true;
      btnFbGooglePopup.classList.add('opacity-70', 'pointer-events-none');
      
      await window.MyLifeFirebase.signInWithGooglePopup();
      // onAuthStateChanged xử lý đăng nhập và tải dữ liệu đúng một luồng.
    } catch (err) {
      console.error('Firebase Google Login Error:', err);
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        const msg = err.code === 'auth/unauthorized-domain'
          ? (isEn ? 'Domain not authorized in Firebase Console! Please add localhost/domain to Authorized Domains.' : 'Tên miền chưa được thêm vào mục Authorized Domains trong Firebase Console!')
          : err.message;
        alert((isEn ? 'Google Login Failed: ' : 'Đăng nhập Google thất bại: ') + msg);
      }
    } finally {
      if (btnFbGooglePopup) {
        btnFbGooglePopup.disabled = false;
        btnFbGooglePopup.classList.remove('opacity-70', 'pointer-events-none');
      }
    }
  });

  async function handleFirebaseUserLoginSuccess(user) {
    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
    if (!user?.uid) throw new Error('Firebase không trả về UID hợp lệ.');

    const uid = user.uid;
    const email = user.email || '';
    const displayName = user.displayName ||
      (email.split('@')[0] || 'User').toUpperCase();
    const photoURL = user.photoURL || '';

    // Chỉ ghép tài khoản theo Firebase UID. Không nhập dữ liệu từ tài khoản
    // cũ chỉ vì trùng email: email không phải khóa sở hữu dữ liệu.
    let existingAcc = savedAccounts.find(a => a.uid === uid || a.id === uid);

    // Tài khoản mới luôn có ID nội bộ bằng UID đầy đủ.
    // Các document acc-gg-* cũ được bỏ qua theo yêu cầu, không tự di chuyển.
    const targetAccId = uid;
    if (existingAcc) {
      existingAcc.id = uid;
      existingAcc.uid = uid;
      existingAcc.name = displayName;
      existingAcc.email = email;
      existingAcc.photoURL = photoURL;
      existingAcc.isGoogle = true;
      existingAcc.password = '';
    } else {
      existingAcc = {
        id: uid,
        uid,
        name: displayName,
        email,
        password: '',
        role: email.includes('.edu.vn') ? 'Cá nhân' : 'Thành viên',
        color: '#4285F4',
        initials: computeInitials(displayName),
        isGoogle: true,
        photoURL,
        createdAt: new Date().toISOString()
      };
      savedAccounts.push(existingAcc);
    }

    activeAccountId = targetAccId;
    saveAccountsData();

    // Giai đoạn thử nghiệm mới: không nhập dữ liệu từ các document cũ.
    // Mỗi Firebase UID khởi tạo dữ liệu riêng trên trình duyệt của người đó.
    // Dữ liệu mới sẽ được tải lên Firestore sau khi khởi tạo xong.
    loadAccountData(targetAccId);

    localStorage.setItem('mylife_google_auth_done', 'true');
    renderAccountUI();
    updateClock();
    closeGoogleAuthScreen();

    const successMsg = isEn
      ? `Welcome ${displayName}! Google authentication successful.`
      : `Chào mừng ${displayName}! Đã xác thực tài khoản Google thành công.`;
    if (typeof showHint === 'function') showHint(successMsg);

    // Bắt đầu đồng bộ bộ dữ liệu mới của UID sau khi khởi tạo thành công.
    const syncOk = await triggerFullCloudSync(false);
    if (!syncOk) {
      console.warn('[MyLife] Đăng nhập thành công nhưng chưa đồng bộ được dữ liệu.');
    }
    return true;
  }

  // Đồng bộ toàn bộ dữ liệu hiện tại lên Firebase Firestore
  async function triggerFullCloudSync(showFeedback = false) {
    if (!window.MyLifeFirebase || !window.MyLifeFirebase.isAvailable()) {
      if (showFeedback) alert('Chưa kết nối được Firebase Firestore!');
      return false;
    }

    const authUser = window.MyLifeFirebase.auth?.currentUser;
    const curAcc = getActiveAccount();
    if (!authUser || !curAcc || !curAcc.uid ||
        authUser.uid !== curAcc.uid) {
      if (showFeedback) alert('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập Google lại.');
      return false;
    }

    const payload = {
      tasks: tasks || [],
      health: healthData || {},
      transactions: transactions || [],
      projects: projects || [],
      taskSettings: taskSettings || {}
    };

    let ok = false;
    try {
      ok = await window.MyLifeFirebase.syncAccountDataToCloud(curAcc, payload);
    } catch (err) {
      console.error('[MyLife] Đồng bộ thất bại:', err);
      if (showFeedback) {
        alert('Đồng bộ thất bại: ' + (err.message || 'Lỗi không xác định'));
      }
      return false;
    }
    if (ok && showFeedback) {
      const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
      const msg = isEn 
        ? `☁️ Cloud Sync successful for ${curAcc.name}! Data is now live on Firebase Firestore.` 
        : `☁️ Đã đồng bộ thành công dữ liệu của ${curAcc.name} lên Firebase Firestore!`;
      if (typeof showHint === 'function') showHint(msg);
      else alert(msg);
    }
    return ok;
  }

  // Nút bấm "Đồng bộ lên Firebase ngay"
  const btnSyncFirebase = document.getElementById('btn-sync-firebase-now');
  btnSyncFirebase?.addEventListener('click', async () => {
    const iconSpin = document.getElementById('icon-sync-firebase-spin');
    const textBtn = document.getElementById('text-sync-firebase-btn');
    if (iconSpin) iconSpin.classList.add('fa-spin');
    if (textBtn) textBtn.textContent = 'Đang đồng bộ...';

    await triggerFullCloudSync(true);

    if (iconSpin) iconSpin.classList.remove('fa-spin');
    if (textBtn) textBtn.textContent = 'Đồng bộ lên Firebase ngay';
  });

  btnToggleGooglePwdVis?.addEventListener('click', () => {
    if (!inputGooglePwd) return;
    if (inputGooglePwd.type === 'password') {
      inputGooglePwd.type = 'text';
      if (iconGooglePwdEye) iconGooglePwdEye.className = 'fa-solid fa-eye-slash text-blue-600';
    } else {
      inputGooglePwd.type = 'password';
      if (iconGooglePwdEye) iconGooglePwdEye.className = 'fa-solid fa-eye';
    }
  });

  formGoogleAuth?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = currentGoogleEmailCandidate || inputGoogleEmail?.value?.trim() || '';
    const pwd = inputGooglePwd?.value || '';
    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');

    if (!email || !pwd) return;

    if (pwd.length < 4) {
      if (googleAuthError && googleAuthErrorText) {
        googleAuthErrorText.textContent = isEn 
          ? 'Password must be at least 4 characters!' 
          : 'Mật khẩu Google phải có tối thiểu 4 ký tự!';
        googleAuthError.classList.remove('hidden');
      }
      return;
    }

    // Check if account already exists in savedAccounts
    const existingAcc = savedAccounts.find(a => (a.email || '').toLowerCase() === email.toLowerCase());

    if (existingAcc) {
      // Validate password with registered account
      const expected = String(existingAcc.password || '123456');
      if (pwd !== expected) {
        if (googleAuthError && googleAuthErrorText) {
          googleAuthErrorText.textContent = isEn 
            ? 'Incorrect Google account password! Verification failed.' 
            : 'Mật khẩu tài khoản Google không chính xác! Xác thực thất bại.';
          googleAuthError.classList.remove('hidden');
          inputGooglePwd?.classList.add('ring-2', 'ring-rose-500');
          setTimeout(() => inputGooglePwd?.classList.remove('ring-2', 'ring-rose-500'), 1500);
        }
        return;
      }
    }

    // Handshake animation for authentic Google Identity feel
    googleStepPwd?.classList.add('hidden');
    googleVerifying?.classList.remove('hidden');

    setTimeout(() => {
      let targetAccId = '';
      if (existingAcc) {
        targetAccId = existingAcc.id;
        existingAcc.isGoogle = true;
      } else {
        if (savedAccounts.length >= 20) {
          alert(isEn ? 'Maximum limit of 20 accounts reached!' : 'Đã đạt giới hạn tối đa 20 tài khoản!');
          googleVerifying?.classList.add('hidden');
          googleStepPwd?.classList.remove('hidden');
          return;
        }

        // Generate full name from email prefix or student code
        let rawName = email.split('@')[0];
        let displayName = rawName.toUpperCase();

        const newAcc = {
          id: 'acc-gg-' + Date.now(),
          name: displayName,
          email: email,
          password: pwd,
          role: email.includes('.edu.vn') ? 'Cá nhân' : 'Thành viên',
          color: '#4285F4', // Google Blue
          initials: computeInitials(displayName),
          isGoogle: true,
          createdAt: new Date().toISOString()
        };

        savedAccounts.push(newAcc);
        targetAccId = newAcc.id;
      }

      activeAccountId = targetAccId;
      localStorage.setItem('mylife_google_auth_done', 'true');
      saveAccountsData();
      renderAccountUI();
      updateClock();
      loadAccountData(activeAccountId);
      closeGoogleAuthScreen();

      const successMsg = isEn 
        ? `Google authentication successful! Signed in as: ${email}` 
        : `Xác thực Google thành công! Đã đăng nhập: ${email}`;
      if (typeof showHint === 'function') showHint(successMsg);
    }, 600);
  });


  // Chặn cổng email/mật khẩu giả lập: mật khẩu nhập ở đây không xác thực với Google.
  formGoogleAuth?.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    alert('Đăng nhập bằng email/mật khẩu giả lập đã được tắt. Hãy sử dụng nút Đăng nhập Google.');
    openGoogleAuthScreen();
  }, true);

  /* ============================================================
   * HELPER: Format / parse VND numbers with dot separators
   * ============================================================ */
  function fmtRaw(n) {
    // 1234567 -> "1.234.567"
    return new Intl.NumberFormat('vi-VN').format(n);
  }
  function formatVND(n) { return fmtRaw(n) + ' ₫'; }
  function parseVND(str) {
    // "1.234.567" -> 1234567
    return parseInt(String(str).replace(/\./g, '').replace(/[^\d]/g, ''), 10) || 0;
  }

  /* ============================================================
   * 1. CLOCK & GREETING
   * ============================================================ */
  const greetingEl = document.getElementById('dynamic-greeting');
  const clockEl    = document.getElementById('realtime-clock');
  const dateEl     = document.getElementById('current-date-text');

  function updateClock() {
    const now = new Date();
    const h = now.getHours();
    const mm = String(now.getMinutes()).padStart(2,'0');
    const ss = String(now.getSeconds()).padStart(2,'0');
    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
    
    let g = '';
    if (isEn) {
      g = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
    } else {
      g = h < 12 ? 'Chào buổi sáng' : h < 14 ? 'Chào buổi trưa' : h < 18 ? 'Chào buổi chiều' : 'Chào buổi tối';
    }
    
    const activeAcc = typeof getActiveAccount === 'function' ? getActiveAccount() : null;
    const accName = activeAcc ? activeAcc.name : (isEn ? 'friend' : 'bạn');
    if (greetingEl) greetingEl.innerHTML = `${g}, ${accName} 👋`;
    if (clockEl) clockEl.textContent = `${String(h).padStart(2,'0')}:${mm}:${ss}`;

    if (isEn) {
      const daysEn = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      const monthsEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      if (dateEl) dateEl.textContent = `${daysEn[now.getDay()]}, ${monthsEn[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    } else {
      const daysVi = ['Chủ Nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
      if (dateEl) dateEl.textContent = `${daysVi[now.getDay()]}, ${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${now.getFullYear()}`;
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ============================================================
   * 2. AMOUNT INPUT – auto dot-separator while typing
   * ============================================================ */
  const amountInput = document.getElementById('trans-amount');
  if (amountInput) {
    amountInput.addEventListener('input', () => {
      const raw = amountInput.value.replace(/\./g, '').replace(/[^\d]/g,'');
      if (raw === '') { amountInput.value = ''; return; }
      const num = parseInt(raw, 10);
      // Reformat with dots
      amountInput.value = fmtRaw(num);
    });
    // On paste
    amountInput.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData('text');
      const raw = pasted.replace(/\./g,'').replace(/[^\d]/g,'');
      if (raw) amountInput.value = fmtRaw(parseInt(raw, 10));
    });
  }

  /* ============================================================
   * 3. FINANCE LOGIN / LOCK SYSTEM
   * ============================================================ */
  const FINANCE_PW_KEY  = 'mylife_finance_pw';
  const FINANCE_SESSION = 'mylife_finance_unlocked';
  const DEFAULT_PW      = '1234';

  financePin = localStorage.getItem(getAccountDataKey('finance_pin')) || localStorage.getItem(FINANCE_PW_KEY) || localStorage.getItem('mylife_finance_pin') || DEFAULT_PW;
  financeUnlocked = sessionStorage.getItem(FINANCE_SESSION) === 'true';

  const lockOverlay    = document.getElementById('finance-lock-overlay');
  const loginModal     = document.getElementById('modal-finance-login');
  const loginForm      = document.getElementById('form-finance-login');
  const pwInput        = document.getElementById('finance-password-input');
  const loginError     = document.getElementById('login-error-msg');
  const eyeIcon        = document.getElementById('pw-eye-icon');

  // Blurred content IDs (tabs + action buttons inside finance view)
  const BLURRED_IDS = ['finance-subtabs', 'ftab-content-overview', 'ftab-content-reports',
                       'ftab-content-history', 'btn-finance-add-main', 'btn-reset-finance-data'];

  function applyLockState() {
    // 1. Sidebar Nav Label & Badge: Synchronized with active language
    const navLabel = document.getElementById('finance-nav-label');
    if (navLabel) navLabel.textContent = t('nav_finance');

    const navBadge = document.getElementById('finance-nav-badge');
    if (navBadge) {
      if (financeUnlocked) {
        navBadge.innerHTML = `<i class="fa-solid fa-lock-open text-[9px] mr-1"></i>${t('badge_unlocked')}`;
        navBadge.className = 'ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-pointer hover:bg-emerald-100 transition-colors';
        navBadge.title = currentLang === 'vi' ? 'Bấm để khóa lại phân hệ tài chính' : 'Click to lock finance module';
      } else {
        navBadge.innerHTML = `<i class="fa-solid fa-lock text-[9px] mr-1"></i>${t('badge_locked')}`;
        navBadge.className = 'ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200';
        navBadge.title = currentLang === 'vi' ? 'Phân hệ đang được khóa bảo vệ' : 'Finance module is currently locked';
      }
    }

    // 2. Che mờ và khóa thẻ Tài chính cá nhân ở trang Tổng quan (view-overview)
    const ovLock = document.getElementById('overview-finance-lock');
    const ovBody = document.getElementById('overview-finance-body');
    if (ovLock && ovBody) {
      if (financeUnlocked) {
        ovLock.classList.add('hidden');
        ovBody.classList.remove('finance-content-blurred');
      } else {
        ovLock.classList.remove('hidden');
        ovBody.classList.add('finance-content-blurred');
      }
    }

    // 3. Phân hệ Tài chính chi tiết (view-finance)
    if (lockOverlay) {
      if (financeUnlocked) {
        lockOverlay.classList.add('hidden');
        BLURRED_IDS.forEach(id => {
          const el = document.getElementById(id);
          if (el) el.classList.remove('finance-content-blurred');
        });
      } else {
        lockOverlay.classList.remove('hidden');
        BLURRED_IDS.forEach(id => {
          const el = document.getElementById(id);
          if (el) el.classList.add('finance-content-blurred');
        });
      }
    }
  }

  function openLoginModal() {
    if (loginModal) {
      const pinHint = document.getElementById('login-modal-default-pin');
      if (pinHint) pinHint.textContent = financePin;
      loginModal.classList.remove('hidden');
      pwInput.focus();
    }
  }
  function closeLoginModal() {
    if (loginModal) { loginModal.classList.add('hidden'); loginForm.reset(); loginError.classList.add('hidden'); }
  }

  document.getElementById('btn-unlock-finance')?.addEventListener('click', openLoginModal);
  document.getElementById('btn-unlock-overview')?.addEventListener('click', openLoginModal);

  // Bấm vào badge 'Đã mở' trên Sidebar để khóa lại khi cần
  document.getElementById('finance-nav-badge')?.addEventListener('click', (e) => {
    if (financeUnlocked) {
      e.stopPropagation();
      if (confirm('Khóa lại dữ liệu Tài chính?')) {
        financeUnlocked = false;
        sessionStorage.removeItem(FINANCE_SESSION);
        applyLockState();
      }
    }
  });

  document.getElementById('btn-cancel-finance-login')?.addEventListener('click', () => {
    closeLoginModal();
  });

  // Toggle password visibility
  document.getElementById('btn-toggle-pw-visibility')?.addEventListener('click', () => {
    if (pwInput.type === 'password') {
      pwInput.type = 'text';
      eyeIcon.className = 'fa-regular fa-eye-slash text-sm';
    } else {
      pwInput.type = 'password';
      eyeIcon.className = 'fa-regular fa-eye text-sm';
    }
  });

  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const storedPw = localStorage.getItem(getAccountDataKey('finance_pin')) || localStorage.getItem(FINANCE_PW_KEY) || localStorage.getItem('mylife_finance_pin') || financePin || DEFAULT_PW;
    if (pwInput.value === storedPw) {
      financeUnlocked = true;
      sessionStorage.setItem(FINANCE_SESSION, 'true');
      closeLoginModal();
      applyLockState();
      renderAllFinanceViews();
    } else {
      loginError.classList.remove('hidden');
      pwInput.value = '';
      pwInput.focus();
      setTimeout(() => loginError.classList.add('hidden'), 3000);
    }
  });

  /* ============================================================
   * 4. MAIN VIEW NAVIGATION
   * ============================================================ */
  const viewOverview = document.getElementById('view-overview');
  const viewFinance  = document.getElementById('view-finance');
  const viewTasks    = document.getElementById('view-tasks');
  const viewHealth   = document.getElementById('view-health');
  const viewSettings = document.getElementById('view-settings');
  const navButtons   = document.querySelectorAll('#nav-menu .nav-item');

  function switchMainView(viewName) {
    try { localStorage.setItem('mylife_active_view', viewName); } catch(e) {}
    navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.view === viewName));
    
    // Hide all main views and reset entrance animation
    [viewOverview, viewFinance, viewTasks, viewHealth, viewSettings].forEach(v => {
      if (v) {
        v.classList.add('hidden');
        v.classList.remove('view-animate-in');
      }
    });

    const activateView = (targetEl) => {
      if (!targetEl) return;
      targetEl.classList.remove('hidden');
      void targetEl.offsetWidth; // trigger reflow for smooth animation
      targetEl.classList.add('view-animate-in');
    };

    if (viewName === 'finance') {
      activateView(viewFinance);
      applyLockState();
      if (financeUnlocked) renderAllFinanceViews();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'tasks') {
      activateView(viewTasks);
      renderDeepTasksView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'health') {
      activateView(viewHealth);
      renderHealthView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'settings') {
      activateView(viewSettings);
      renderSettingsView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      activateView(viewOverview);
      renderFinanceOverviewCard();
      renderTasks();
      renderHealthOverviewCard();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  navButtons.forEach(btn => {
    if (btn.id === 'btn-nav-ai-chat') return; // Nút mở trợ lý AI, không phải phân hệ màn hình chính
    btn.addEventListener('click', () => {
      const v = btn.dataset.view;
      if (v === 'overview' || v === 'finance' || v === 'tasks' || v === 'health' || v === 'settings') {
        switchMainView(v);
      } else if (v === 'kanban') {
        switchMainView('tasks');
        setTimeout(() => {
          document.getElementById('cards-col-todo')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
      } else if (v) {
        showHint(`Phân hệ "${btn.querySelector('span')?.textContent || v}" đang phát triển!`);
      }
    });
  });

  document.getElementById('btn-settings-back-to-overview')?.addEventListener('click', () => {
    switchMainView('overview');
  });
  document.getElementById('btn-health-back-to-overview')?.addEventListener('click', () => {
    switchMainView('overview');
  });
  document.getElementById('btn-goto-health-from-ov')?.addEventListener('click', () => {
    switchMainView('health');
  });
  document.getElementById('btn-ov-open-health-detail')?.addEventListener('click', () => {
    switchMainView('health');
  });
  document.getElementById('btn-ov-open-sleep')?.addEventListener('click', () => {
    switchMainView('health');
  });

  document.getElementById('logo-home')?.addEventListener('click', () => switchMainView('overview'));
  document.getElementById('btn-back-to-overview')?.addEventListener('click', () => switchMainView('overview'));
  document.getElementById('btn-tasks-back-to-overview')?.addEventListener('click', () => switchMainView('overview'));
  document.getElementById('btn-goto-tasks')?.addEventListener('click', () => switchMainView('tasks'));
  document.getElementById('btn-goto-finance')?.addEventListener('click', () => {
    if (!financeUnlocked) openLoginModal();
    else switchMainView('finance');
  });
  document.getElementById('btn-view-finance-detail')?.addEventListener('click', () => {
    if (!financeUnlocked) openLoginModal();
    else switchMainView('finance');
  });
  document.getElementById('link-open-finance')?.addEventListener('click', () => {
    if (!financeUnlocked) openLoginModal();
    else switchMainView('finance');
  });
  document.getElementById('btn-see-all-transactions')?.addEventListener('click', () => {
    if (!financeUnlocked) openLoginModal();
    else {
      switchMainView('finance');
      switchFinanceSubTab('history');
    }
  });

  /* ============================================================
   * 5. POMODORO TIMER (ĐÃ LOẠI BỎ THEO YÊU CẦU NGƯỜI DÙNG)
   * ============================================================ */

  /* ============================================================
   * 6. TRANSACTIONS DATA
   * ============================================================ */
  // Xóa mock data cũ nếu còn tồn tại
  localStorage.removeItem('mylife_finance');

  transactions = JSON.parse(localStorage.getItem(getAccountDataKey('transactions'))) || JSON.parse(localStorage.getItem('mylife_transactions_v2')) || [];

  function saveTrans() {
    localStorage.setItem(getAccountDataKey('transactions'), JSON.stringify(transactions));
    if (activeAccountId === 'acc-1') {
      localStorage.setItem('mylife_transactions_v2', JSON.stringify(transactions));
    }
    const curAcc = savedAccounts.find(a => a.id === activeAccountId);
    const targetId = curAcc?.uid || curAcc?.id || activeAccountId;
    if (window.MyLifeFirebase?.isAvailable() && targetId) {
      window.MyLifeFirebase.syncModuleToCloud(targetId, 'transactions', transactions);
    }
    renderAllFinanceViews();
    renderFinanceOverviewCard();
    if (typeof renderSmartNotifications === 'function') renderSmartNotifications();
  }

  function formatDateTimeVN(dtStr) {
    if (!dtStr) return 'Vừa xong';
    const d = new Date(dtStr);
    if (isNaN(d.getTime())) return dtStr;
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')} – ${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  }

  const catMeta = {
    'Ăn uống':           { icon:'fa-utensils',        color:'bg-amber-100 text-amber-700',   chart:'#F59E0B' },
    'Nhà ở & Hóa đơn':  { icon:'fa-house-chimney',   color:'bg-blue-100 text-blue-700',     chart:'#3B82F6' },
    'Mua sắm':           { icon:'fa-bag-shopping',    color:'bg-purple-100 text-purple-700', chart:'#8B5CF6' },
    'Di chuyển':         { icon:'fa-car',              color:'bg-indigo-100 text-indigo-700', chart:'#6366F1' },
    'Học tập & Công việc':{ icon:'fa-graduation-cap', color:'bg-teal-100 text-teal-700',    chart:'#14B8A6' },
    'Giải trí':          { icon:'fa-film',             color:'bg-rose-100 text-rose-700',    chart:'#F43F5E' },
    'Lương & Thưởng':    { icon:'fa-sack-dollar',      color:'bg-emerald-100 text-emerald-700', chart:'#10B981' },
    'Khác':              { icon:'fa-shapes',            color:'bg-slate-100 text-slate-600',  chart:'#94A3B8' },
  };

  function getCatBadge(cat) {
    const m = catMeta[cat] || catMeta['Khác'];
    return `<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[11px] font-semibold ${m.color}"><i class="fa-solid ${m.icon}"></i>${cat}</span>`;
  }

  /* ============================================================
   * 7. FINANCE SUB-TABS NAVIGATION
   * ============================================================ */
  const filterMonthSel = document.getElementById('finance-filter-month');
  const filterYearSel  = document.getElementById('finance-filter-year');

  filterMonthSel?.addEventListener('change', renderAllFinanceViews);
  filterYearSel?.addEventListener('change',  renderAllFinanceViews);

  function getFilteredTrans() {
    const mon  = filterMonthSel?.value || 'all';
    const year = filterYearSel?.value  || '2026';
    return transactions.filter(t => {
      const d = new Date(t.datetime);
      if (isNaN(d)) return true;
      if (d.getFullYear().toString() !== year) return false;
      return mon === 'all' || (d.getMonth()+1).toString() === mon;
    });
  }

  const subtabBtns = document.querySelectorAll('#finance-subtabs .ftab-btn');
  function switchFinanceSubTab(name) {
    subtabBtns.forEach(b => {
      if (b.dataset.ftab === name) {
        b.className = 'ftab-btn active flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all text-blue-600 bg-white shadow-sm';
      } else {
        b.className = 'ftab-btn flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all text-slate-600 hover:text-slate-900';
      }
    });
    ['overview','reports','history'].forEach(id => {
      const el = document.getElementById(`ftab-content-${id}`);
      if (el) el.classList.toggle('hidden', id !== name);
    });
    if (name === 'reports')  renderReportsTab();
    if (name === 'history')  renderHistoryTable();
  }

  subtabBtns.forEach(b => b.addEventListener('click', () => {
    if (!financeUnlocked) return;
    switchFinanceSubTab(b.dataset.ftab);
  }));
  document.getElementById('btn-switch-to-history')?.addEventListener('click', () => switchFinanceSubTab('history'));

  /* ============================================================
   * 8. FINANCE OVERVIEW TAB (Top spending + recent transactions)
   * ============================================================ */
  let topSpendingExpanded = false;
  document.getElementById('btn-toggle-top-spending')?.addEventListener('click', () => {
    topSpendingExpanded = !topSpendingExpanded;
    renderFinanceOverviewTab();
  });

  function renderFinanceOverviewTab() {
    const filtered = getFilteredTrans();
    let pIncome = 0, pSpent = 0;
    filtered.forEach(t => { if(t.type==='income') pIncome+=t.amount; else pSpent+=t.amount; });
    const pBal = pIncome - pSpent;
    const ratio = pIncome > 0 ? Math.round(pSpent/pIncome*1000)/10 : (pSpent>0?100:0);

    const setTxt = (id,val) => { const el=document.getElementById(id); if(el) el.textContent=val; };
    setTxt('kpi-period-income',  fmtRaw(pIncome));
    setTxt('kpi-period-spent',   fmtRaw(pSpent));
    setTxt('kpi-period-balance', fmtRaw(pBal));
    setTxt('kpi-period-ratio',   `${ratio}%`);

    const evalEl = document.getElementById('kpi-period-evaluation');
    if (evalEl) {
      const isEn = (currentLang === 'en');
      if (!pIncome && !pSpent) {
        evalEl.innerHTML = `<span class="text-slate-400">${isEn ? 'No transactions in this period' : 'Chưa có giao dịch trong kỳ'}</span>`;
      } else if (pBal > 0) {
        evalEl.innerHTML = `<span class="text-emerald-400 font-semibold">${isEn ? `✅ Surplus +${formatVND(pBal)}` : `✅ Thặng dư +${formatVND(pBal)}`}</span>`;
      } else if (pBal < 0) {
        evalEl.innerHTML = `<span class="text-rose-400 font-semibold">${isEn ? `⚠️ Deficit ${formatVND(pBal)}` : `⚠️ Chi vượt thu ${formatVND(pBal)}`}</span>`;
      } else {
        evalEl.innerHTML = `<span class="text-amber-300 font-semibold">${isEn ? '⚖️ Balanced cashflow' : '⚖️ Cân bằng thu chi'}</span>`;
      }
    }

    // TOP CHI TIÊU (Giới hạn hiển thị 4 mục để nhìn clean)
    const topCon = document.getElementById('top-spending-list');
    const topCnt = document.getElementById('top-spent-count');
    const topExpandCon = document.getElementById('top-spending-expand-container');
    const topExpandBtn = document.getElementById('btn-toggle-top-spending');
    const expenses = filtered.filter(t=>t.type==='expense');

    const isEn = (currentLang === 'en');
    if (!expenses.length) {
      if(topCnt) topCnt.textContent = isEn ? '0 categories' : '0 mục';
      if(topExpandCon) topExpandCon.classList.add('hidden');
      if(topCon) topCon.innerHTML = `
        <div class="text-center py-8 text-slate-400 text-xs">
          <i class="fa-solid fa-receipt text-3xl text-slate-200 mb-2 block"></i>
          <p class="font-medium text-slate-500">${isEn ? 'No expenses recorded yet' : 'Chưa có khoản chi tiêu nào'}</p>
          <p class="text-[11px] mt-1">${isEn ? 'Add transactions to see analytics!' : 'Thêm giao dịch để xem thống kê!'}</p>
        </div>`;
    } else {
      const catTotals = {};
      expenses.forEach(t => catTotals[t.category] = (catTotals[t.category]||0)+t.amount);
      const sorted = Object.entries(catTotals).sort((a,b)=>b[1]-a[1]);
      if(topCnt) topCnt.textContent = isEn ? `${sorted.length} categories` : `${sorted.length} mục`;
      
      const displayCats = topSpendingExpanded ? sorted : sorted.slice(0, 4);

      if(topCon) {
        topCon.innerHTML = '';
        displayCats.forEach(([cat,tot]) => {
          const pct = pSpent>0 ? Math.round(tot/pSpent*100) : 0;
          const m = catMeta[cat]||catMeta['Khác'];
          const div = document.createElement('div');
          div.className = 'p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition-all';
          div.innerHTML = `
            <div class="flex items-center justify-between text-xs mb-1.5">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg ${m.color} flex items-center justify-center text-[10px]"><i class="fa-solid ${m.icon}"></i></span>
                <span class="font-bold text-slate-800">${cat}</span>
              </div>
              <div class="text-right">
                <span class="font-extrabold text-slate-900">${formatVND(tot)}</span>
                <span class="text-[10px] text-slate-400 ml-1">(${pct}%)</span>
              </div>
            </div>
            <div class="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
              <div class="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full" style="width:${pct}%"></div>
            </div>`;
          topCon.appendChild(div);
        });
      }

      if (sorted.length > 4) {
        topExpandCon?.classList.remove('hidden');
        if (topExpandBtn) {
          topExpandBtn.textContent = topSpendingExpanded ? 'Thu gọn (hiện 4 mục) ↑' : `Xem tất cả (${sorted.length} mục) ↓`;
        }
      } else {
        topExpandCon?.classList.add('hidden');
      }
    }

    // GIAO DỊCH GẦN ĐÂY (Giới hạn hiển thị 4 giao dịch để nhìn clean)
    const recentCon  = document.getElementById('finance-recent-list');
    const recentLbl  = document.getElementById('recent-trans-count-label');
    const sorted2 = [...filtered].sort((a,b)=>new Date(b.datetime)-new Date(a.datetime));
    if (!sorted2.length) {
      if(recentLbl) recentLbl.textContent = isEn ? 'Showing 0 transactions' : 'Hiển thị 0 giao dịch';
      if(recentCon) recentCon.innerHTML = `
        <div class="text-center py-8 text-slate-400 text-xs">
          <i class="fa-solid fa-clock-rotate-left text-3xl text-slate-200 mb-2 block"></i>
          <p class="font-medium text-slate-500">${isEn ? 'No transactions – numbers are blank' : 'Chưa có giao dịch – thông số đang để trắng'}</p>
          <p class="text-[11px] mt-1">${isEn ? 'Click "Add New Transaction" to start!' : 'Bấm "Thêm giao dịch mới" để bắt đầu!'}</p>
        </div>`;
    } else {
      if(recentLbl) recentLbl.textContent = isEn ? `Showing ${Math.min(4,sorted2.length)} of ${sorted2.length} transactions` : `Hiển thị ${Math.min(4,sorted2.length)} / ${sorted2.length} giao dịch`;
      if(recentCon) {
        recentCon.innerHTML = '';
        sorted2.slice(0,4).forEach(t => {
          const isInc = t.type==='income';
          const div = document.createElement('div');
          div.className = 'flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all';
          div.innerHTML = `
            <div class="flex items-center gap-3 min-w-0 pr-2">
              <div class="w-9 h-9 rounded-xl ${isInc?'bg-emerald-100 text-emerald-600':'bg-rose-100 text-rose-600'} flex items-center justify-center text-sm font-bold shrink-0">
                <i class="fa-solid ${isInc?'fa-arrow-down-left':'fa-arrow-up-right'}"></i>
              </div>
              <div class="min-w-0 truncate">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-bold text-slate-900 text-xs truncate">${t.title}</span>
                  ${getCatBadge(t.category)}
                </div>
                <p class="text-[11px] text-slate-400 mt-0.5"><i class="fa-regular fa-clock mr-1"></i>${formatDateTimeVN(t.datetime)}</p>
              </div>
            </div>
            <div class="flex items-center gap-3 shrink-0">
              <span class="font-extrabold text-sm ${isInc?'text-emerald-600':'text-slate-900'}">${isInc?'+':'-'}${formatVND(t.amount)}</span>
              <button data-id="${t.id}" class="btn-del-trans text-slate-300 hover:text-rose-500 p-1.5 rounded-lg hover:bg-white transition-colors" title="Xóa">
                <i class="fa-solid fa-trash-can text-xs"></i>
              </button>
            </div>`;
          recentCon.appendChild(div);
        });
      }
    }

    // Delete buttons
    document.querySelectorAll('.btn-del-trans').forEach(b => {
      b.addEventListener('click', e => delTrans(Number(e.currentTarget.dataset.id)));
    });

    // Badge total
    const badge = document.getElementById('badge-total-trans');
    if(badge) badge.textContent = transactions.length;
  }

  /* ============================================================
   * 9. REPORTS TAB – Table + Pie Chart + Bar Chart
   * ============================================================ */
  let pieChartInstance = null;
  let barChartInstance = null;

  function renderReportsTab() {
    const year = filterYearSel?.value || '2026';
    const selMonth = filterMonthSel?.value || 'all';

    // Update labels
    const yearLbl = document.getElementById('report-year-label');
    const barYrLbl = document.getElementById('bar-chart-year-label');
    if(yearLbl) yearLbl.textContent = year;
    if(barYrLbl) barYrLbl.textContent = `năm ${year}`;

    // --- 12-MONTH TABLE ---
    const tbody = document.getElementById('monthly-report-tbody');
    const tfoot = document.getElementById('monthly-report-tfoot');
    if(!tbody) return;
    tbody.innerHTML = '';

    let tyIncome=0, tySpent=0;
    const monthlyIncome = Array(13).fill(0);
    const monthlySpent  = Array(13).fill(0);

    transactions.forEach(t => {
      const d = new Date(t.datetime);
      if(isNaN(d)||d.getFullYear().toString()!==year) return;
      const m = d.getMonth()+1;
      if(t.type==='income') { monthlyIncome[m]+=t.amount; tyIncome+=t.amount; }
      else                   { monthlySpent[m]+=t.amount;  tySpent+=t.amount;  }
    });

    for(let m=1;m<=12;m++){
      const inc=monthlyIncome[m], sp=monthlySpent[m], bal=inc-sp;
      const rt = inc>0 ? Math.round(sp/inc*100) : (sp>0?100:0);
      const tr = document.createElement('tr');
      tr.className='hover:bg-slate-50/80 transition-colors';
      tr.innerHTML = `
        <td class="p-3 font-bold text-slate-800">
          <span class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full ${sp>0||inc>0?'bg-blue-600':'bg-slate-200'}"></span>
            Tháng ${m}
          </span>
        </td>
        <td class="p-3 text-right font-medium text-emerald-600">${inc>0?'+'+formatVND(inc):'0 ₫'}</td>
        <td class="p-3 text-right font-medium text-rose-600">${sp>0?'-'+formatVND(sp):'0 ₫'}</td>
        <td class="p-3 text-right font-bold ${bal>0?'text-emerald-700':bal<0?'text-rose-700':'text-slate-400'}">
          ${bal>0?'+':''}${formatVND(bal)}
        </td>
        <td class="p-3 text-center">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${rt>80?'bg-rose-100 text-rose-700':rt>50?'bg-amber-100 text-amber-700':'bg-emerald-100 text-emerald-700'}">${rt}%</span>
        </td>
        <td class="p-3 text-center">
          <button data-month="${m}" class="btn-jump-month text-blue-600 hover:underline font-semibold text-xs">Xem tháng</button>
        </td>`;
      tbody.appendChild(tr);
    }

    const tyBal=tyIncome-tySpent, tyRt=tyIncome>0?Math.round(tySpent/tyIncome*100):(tySpent>0?100:0);
    if(tfoot) tfoot.innerHTML=`<tr>
      <td class="p-3">TỔNG NĂM ${year}</td>
      <td class="p-3 text-right text-emerald-600">+${formatVND(tyIncome)}</td>
      <td class="p-3 text-right text-rose-600">-${formatVND(tySpent)}</td>
      <td class="p-3 text-right ${tyBal>=0?'text-emerald-700':'text-rose-700'}">${formatVND(tyBal)}</td>
      <td class="p-3 text-center">${tyRt}%</td>
      <td class="p-3 text-center text-slate-400">12 tháng</td></tr>`;

    document.querySelectorAll('.btn-jump-month').forEach(b=>{
      b.addEventListener('click',e=>{
        if(filterMonthSel) filterMonthSel.value = e.currentTarget.dataset.month;
        switchFinanceSubTab('overview');
        renderAllFinanceViews();
      });
    });

    // --- CATEGORIES BREAKDOWN ---
    const catCon = document.getElementById('categories-breakdown-list');
    const yearExpenses = transactions.filter(t=>{
      const d=new Date(t.datetime);
      return !isNaN(d)&&d.getFullYear().toString()===year&&t.type==='expense';
    });
    if(!catCon) {}
    else if(!yearExpenses.length) {
      catCon.innerHTML=`<p class="text-slate-400 py-4 text-center italic">Chưa có chi tiêu nào trong năm ${year}.</p>`;
    } else {
      const catT={};
      yearExpenses.forEach(t=>catT[t.category]=(catT[t.category]||0)+t.amount);
      catCon.innerHTML='';
      Object.entries(catT).sort((a,b)=>b[1]-a[1]).forEach(([cat,amt])=>{
        const pct=tySpent>0?Math.round(amt/tySpent*100):0;
        const m=catMeta[cat]||catMeta['Khác'];
        const div=document.createElement('div');
        div.innerHTML=`
          <div class="flex justify-between items-center mb-1">
            <span class="font-medium text-slate-700 flex items-center gap-1.5 text-xs">
              <span class="w-5 h-5 rounded-md ${m.color} flex items-center justify-center text-[10px]"><i class="fa-solid ${m.icon}"></i></span>${cat}
            </span>
            <span class="font-bold text-slate-900 text-xs">${formatVND(amt)} <span class="text-slate-400 text-[10px]">(${pct}%)</span></span>
          </div>
          <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div class="bg-indigo-600 h-full rounded-full" style="width:${pct}%"></div>
          </div>`;
        catCon.appendChild(div);
      });
    }

    // --- AI ADVICE ---
    const aiEl = document.getElementById('ai-financial-advice');
    if(aiEl) {
      if(!tyIncome&&!tySpent) aiEl.textContent='Chưa có dữ liệu. Hãy ghi chép thu – chi để AI phân tích!';
      else if(tyBal>=0&&tyRt<=60) aiEl.innerHTML=`🌟 <b>Xuất sắc!</b> Tiết kiệm được <b>${100-tyRt}%</b> thu nhập. Dòng tiền rất an toàn!`;
      else if(tyBal>=0) aiEl.innerHTML=`👍 <b>Ổn định!</b> Tỷ lệ chi <b>${tyRt}%</b>. Có thể cắt giảm Mua sắm/Giải trí để tăng tiết kiệm.`;
      else aiEl.innerHTML=`⚠️ <b>Cảnh báo!</b> Chi vượt thu <b>${formatVND(Math.abs(tyBal))}</b>. Hãy kiểm soát chi tiêu ngay!`;
    }

    // ===== BIỂU ĐỒ TRÒN (Pie – Chi tiêu theo danh mục trong tháng được chọn) =====
    renderPieChart(selMonth, year);

    // ===== BIỂU ĐỒ CỘT (Bar – Thu & Chi 12 tháng trong năm) =====
    renderBarChart(year, monthlyIncome, monthlySpent);
  }

  function renderPieChart(selMonth, year) {
    const piePeriodLbl = document.getElementById('pie-chart-period-label');
    const pieEmpty     = document.getElementById('pie-empty-state');
    const pieLegend    = document.getElementById('pie-legend');
    const canvas       = document.getElementById('chart-pie-monthly');
    if (!canvas) return;

    if(piePeriodLbl) piePeriodLbl.textContent = selMonth==='all' ? `cả năm ${year}` : `Tháng ${selMonth}/${year}`;

    // Filter expenses for pie
    const pieExpenses = transactions.filter(t => {
      if(t.type !== 'expense') return false;
      const d = new Date(t.datetime);
      if(isNaN(d)||d.getFullYear().toString()!==year) return false;
      if(selMonth==='all') return true;
      return (d.getMonth()+1).toString() === selMonth;
    });

    if (!pieExpenses.length) {
      canvas.style.display = 'none';
      if(pieEmpty) pieEmpty.classList.remove('hidden');
      if(pieLegend) pieLegend.innerHTML = '';
      if(pieChartInstance) { pieChartInstance.destroy(); pieChartInstance=null; }
      return;
    }
    canvas.style.display = '';
    if(pieEmpty) pieEmpty.classList.add('hidden');

    const catT = {};
    pieExpenses.forEach(t => catT[t.category] = (catT[t.category]||0)+t.amount);
    const labels   = Object.keys(catT);
    const data     = labels.map(l=>catT[l]);
    const bgColors = labels.map(l=>(catMeta[l]||catMeta['Khác']).chart);

    if(pieChartInstance) pieChartInstance.destroy();
    pieChartInstance = new Chart(canvas, {
      type: 'doughnut',
      data: { labels, datasets: [{ data, backgroundColor: bgColors, borderWidth: 2, borderColor: '#fff', hoverOffset: 8 }] },
      options: {
        responsive: true, maintainAspectRatio: true,
        cutout: '62%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.label}: ${formatVND(ctx.parsed)} (${Math.round(ctx.parsed/data.reduce((a,b)=>a+b,0)*100)}%)`,
            }
          }
        }
      }
    });

    // Custom legend
    if(pieLegend) {
      pieLegend.innerHTML = '';
      labels.forEach((lbl,i)=>{
        const div=document.createElement('div');
        div.className='flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-slate-50 transition-colors';
        div.innerHTML=`<span class="w-3 h-3 rounded-full shrink-0" style="background:${bgColors[i]}"></span><span class="truncate font-medium text-slate-700">${lbl}</span>`;
        pieLegend.appendChild(div);
      });
    }
  }

  function renderBarChart(year, monthlyIncome, monthlySpent) {
    const canvas = document.getElementById('chart-bar-yearly');
    if (!canvas) return;

    const labels = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];
    const incData = labels.map((_,i)=>monthlyIncome[i+1]);
    const spData  = labels.map((_,i)=>monthlySpent[i+1]);

    if(barChartInstance) barChartInstance.destroy();
    barChartInstance = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Thu nhập',
            data: incData,
            backgroundColor: 'rgba(16,185,129,0.75)',
            borderColor: '#10B981',
            borderWidth: 1.5,
            borderRadius: 6,
            borderSkipped: false,
          },
          {
            label: 'Chi tiêu',
            data: spData,
            backgroundColor: 'rgba(244,63,94,0.7)',
            borderColor: '#F43F5E',
            borderWidth: 1.5,
            borderRadius: 6,
            borderSkipped: false,
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11, weight: '600' }, color: '#64748b' } },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(148,163,184,0.15)' },
            ticks: {
              font: { size: 10 }, color: '#94a3b8',
              callback: v => v >= 1e6 ? (v/1e6).toFixed(1)+'M' : v >= 1e3 ? (v/1e3).toFixed(0)+'K' : v
            }
          }
        },
        plugins: {
          legend: { labels: { font: { size: 11, weight: '600' }, boxWidth: 12, boxHeight: 12, usePointStyle: true, pointStyle: 'rectRounded' } },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: ${formatVND(ctx.parsed.y)}`
            }
          }
        }
      }
    });
  }

  /* ============================================================
   * 10. HISTORY TABLE
   * ============================================================ */
  function renderHistoryTable() {
    const tbody  = document.getElementById('history-table-tbody');
    const sumTxt = document.getElementById('history-summary-text');
    const q      = (document.getElementById('history-search-input')?.value||'').toLowerCase().trim();
    const fType  = document.getElementById('history-filter-type')?.value||'all';
    const fCat   = document.getElementById('history-filter-category')?.value||'all';
    if(!tbody) return;

    let list = [...transactions];
    if(fType!=='all')   list = list.filter(t=>t.type===fType);
    if(fCat!=='all')    list = list.filter(t=>t.category===fCat);
    if(q)               list = list.filter(t=>t.title.toLowerCase().includes(q)||t.category.toLowerCase().includes(q));
    list.sort((a,b)=>new Date(b.datetime)-new Date(a.datetime));

    if(sumTxt) sumTxt.textContent = `Tổng cộng ${list.length} giao dịch`;
    if(!list.length) {
      tbody.innerHTML=`<tr><td colspan="6" class="p-8 text-center text-slate-400 text-xs"><i class="fa-solid fa-folder-open text-3xl mb-2 text-slate-300 block"></i>Không tìm thấy giao dịch phù hợp.</td></tr>`;
      return;
    }
    tbody.innerHTML='';
    list.forEach(t=>{
      const isInc=t.type==='income';
      const tr=document.createElement('tr');
      tr.className='hover:bg-slate-50 transition-colors';
      tr.innerHTML=`
        <td class="p-3 text-slate-600 font-medium text-xs"><i class="fa-regular fa-clock mr-1 text-slate-400"></i>${formatDateTimeVN(t.datetime)}</td>
        <td class="p-3 font-bold text-slate-900 text-xs">${t.title}</td>
        <td class="p-3">${getCatBadge(t.category)}</td>
        <td class="p-3 text-xs font-semibold ${isInc?'text-emerald-600':'text-rose-600'}">
          <i class="fa-solid ${isInc?'fa-arrow-down-left':'fa-arrow-up-right'} mr-1"></i>${isInc?'Thu nhập':'Chi tiêu'}
        </td>
        <td class="p-3 text-right font-extrabold text-sm ${isInc?'text-emerald-600':'text-slate-900'}">${isInc?'+':'-'}${formatVND(t.amount)}</td>
        <td class="p-3 text-center">
          <button data-id="${t.id}" class="btn-del-hist text-slate-300 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors">
            <i class="fa-solid fa-trash-can text-xs"></i>
          </button>
        </td>`;
      tbody.appendChild(tr);
    });
    document.querySelectorAll('.btn-del-hist').forEach(b=>b.addEventListener('click',e=>delTrans(Number(e.currentTarget.dataset.id))));
  }

  document.getElementById('history-search-input')?.addEventListener('input', renderHistoryTable);
  document.getElementById('history-filter-type')?.addEventListener('change', renderHistoryTable);
  document.getElementById('history-filter-category')?.addEventListener('change', renderHistoryTable);

  document.getElementById('btn-clear-all-transactions')?.addEventListener('click',()=>{
    if(confirm('Xóa TẤT CẢ giao dịch?')) { transactions=[]; saveTrans(); }
  });
  document.getElementById('btn-reset-finance-data')?.addEventListener('click',()=>{
    if(confirm('Đặt lại toàn bộ về 0?')) { transactions=[]; saveTrans(); }
  });

  document.getElementById('btn-export-csv')?.addEventListener('click',()=>{
    if(!transactions.length) { alert('Chưa có giao dịch để xuất!'); return; }
    let csv='\uFEFF'; // UTF-8 BOM
    csv+='Thời Gian,Khoản Tiền,Danh Mục,Phân Loại,Số Tiền (VND)\n';
    transactions.forEach(t=>{
      csv+=`"${formatDateTimeVN(t.datetime)}","${t.title}","${t.category}","${t.type==='income'?'Thu nhập':'Chi tiêu'}",${t.type==='income'?t.amount:-t.amount}\n`;
    });
    const a=document.createElement('a');
    a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));
    a.download=`MyLife_TaiChinh_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  });

  function delTrans(id) {
    if(confirm('Xóa giao dịch này?')) { transactions=transactions.filter(t=>t.id!==id); saveTrans(); }
  }

  /* ============================================================
   * 11. OVERVIEW CARD (on main dashboard)
   * ============================================================ */
  function renderFinanceOverviewCard() {
    let totInc=0, totSp=0;
    transactions.forEach(t=>{if(t.type==='income') totInc+=t.amount; else totSp+=t.amount;});
    const bal=totInc-totSp;
    const pct=totInc>0?Math.min(100,Math.round(totSp/totInc*100*10)/10):(totSp>0?100:0);

    const setTxt=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
    setTxt('finance-balance', fmtRaw(bal));
    setTxt('finance-income',  formatVND(totInc));
    setTxt('finance-spent',   formatVND(totSp));
    setTxt('finance-percent-label', `${pct}%`);

    const bar=document.getElementById('finance-progress-bar');
    if(bar){
      bar.style.width=`${pct}%`;
      bar.className='h-full rounded-full transition-all duration-700 '+(pct>85?'bg-rose-500':pct>65?'bg-amber-500':'bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-600');
    }

    const isEn = (currentLang === 'en');
    const statEl=document.getElementById('finance-status-text');
    if(statEl) {
      statEl.textContent = transactions.length
        ? (isEn ? `${transactions.length} transactions recorded` : `${transactions.length} giao dịch đã ghi`)
        : (isEn ? 'No transactions recorded' : 'Chưa có giao dịch nào');
    }

    const ovRecent=document.getElementById('recent-transactions');
    if(!ovRecent) return;
    if(!transactions.length){
      ovRecent.innerHTML=`<p class="text-xs text-slate-400 py-3 text-center italic">${isEn ? 'No transactions yet. Click "+ Record" to add!' : 'Chưa có giao dịch. Bấm "+ Ghi chép" để thêm!'}</p>`;
    } else {
      ovRecent.innerHTML='';
      // Giới hạn hiển thị đúng 4 giao dịch gần nhất cho gọn gàng (clean UI)
      [...transactions].sort((a,b)=>new Date(b.datetime)-new Date(a.datetime)).slice(0,4).forEach(item=>{
        const isInc=item.type==='income';
        const div=document.createElement('div');
        div.className='flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition-colors';
        div.innerHTML=`
          <div class="flex items-center gap-2 truncate">
            <span class="w-6 h-6 rounded-lg ${isInc?'bg-emerald-100 text-emerald-600':'bg-rose-100 text-rose-600'} flex items-center justify-center text-[10px] font-bold">
              <i class="fa-solid ${isInc?'fa-arrow-down-left':'fa-arrow-up-right'}"></i>
            </span>
            <span class="font-medium text-slate-800 truncate text-xs">${item.title}</span>
          </div>
          <div class="text-right shrink-0">
            <span class="font-bold text-xs ${isInc?'text-emerald-600':'text-slate-800'}">${isInc?'+':'-'}${formatVND(item.amount)}</span>
            <span class="text-[10px] text-slate-400 block">${formatDateTimeVN(item.datetime)}</span>
          </div>`;
        ovRecent.appendChild(div);
      });
    }
  }

  function renderAllFinanceViews() {
    if(!financeUnlocked) return;
    renderFinanceOverviewTab();
    renderReportsTab();
    renderHistoryTable();
  }

  renderFinanceOverviewCard();
  applyLockState();

  /* ============================================================
   * 12. TRANSACTION MODAL
   * ============================================================ */
  const transModal   = document.getElementById('modal-transaction');
  const transForm    = document.getElementById('form-transaction');
  const dtInput      = document.getElementById('trans-datetime');

  function openTransModal() {
    if (!financeUnlocked) {
      openLoginModal();
      return;
    }
    const now=new Date();
    if(dtInput) dtInput.value = new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,16);
    if(amountInput) amountInput.value = '';
    transModal.classList.remove('hidden');
    document.getElementById('trans-title')?.focus();
  }
  function closeTransModal() { transModal.classList.add('hidden'); transForm.reset(); }

  ['btn-add-transaction','btn-finance-add-main','btn-quick-add-from-recent'].forEach(id=>{
    document.getElementById(id)?.addEventListener('click', openTransModal);
  });
  document.getElementById('btn-close-modal')?.addEventListener('click', closeTransModal);
  document.getElementById('btn-cancel-modal')?.addEventListener('click', closeTransModal);
  transModal?.addEventListener('click', e=>{ if(e.target===transModal) closeTransModal(); });

  transForm?.addEventListener('submit', e=>{
    e.preventDefault();
    const type     = document.querySelector('input[name="trans-type"]:checked').value;
    const title    = document.getElementById('trans-title').value.trim();
    const category = document.getElementById('trans-category').value;
    const amount   = parseVND(amountInput?.value || '0');
    const dtVal    = dtInput?.value;
    if(!title||!amount) return;
    transactions.unshift({ id: Date.now(), title, category, type, amount, datetime: dtVal||new Date().toISOString() });
    saveTrans();
    closeTransModal();
  });

  /* ============================================================
   * 13. TRUNG TÂM CÔNG VIỆC, LỊCH BIỂU (DUAL PANEL) & ĐỒNG BỘ NGÔN NGỮ (I18N)
   * ============================================================ */

  function t(key) {
    return (i18nData[currentLang] && i18nData[currentLang][key]) || (i18nData.vi[key] || key);
  }

  function applyLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'vi';
    localStorage.setItem('mylife_language', currentLang);

    // Update Header Pill
    const flagEl = document.getElementById('header-lang-flag');
    if (flagEl) flagEl.remove();
    const codeEl = document.getElementById('header-lang-code');
    if (codeEl) codeEl.textContent = currentLang === 'en' ? 'EN' : 'VI';

    // Update Settings Cards Active State
    const cardVi = document.getElementById('lang-opt-vi');
    const cardEn = document.getElementById('lang-opt-en');
    cardVi?.classList.toggle('active', currentLang === 'vi');
    cardEn?.classList.toggle('active', currentLang === 'en');

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.dataset.i18n;
      if (k && i18nData[currentLang][k]) {
        el.textContent = i18nData[currentLang][k];
      }
    });

    // Update all elements with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const k = el.dataset.i18nPlaceholder;
      if (k && i18nData[currentLang][k]) {
        el.placeholder = i18nData[currentLang][k];
      }
    });

    // Update Global Search Placeholder
    const gs = document.getElementById('global-search');
    if (gs) gs.placeholder = t('search_placeholder');

    // Update Finance Filter Month Dropdown Options
    const fMonthSel = document.getElementById('finance-filter-month');
    if (fMonthSel) {
      const curVal = fMonthSel.value;
      const monthNamesEn = ['All months (Full Year)', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const monthNamesVi = ['Tất cả các tháng (Cả năm)', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
      const names = currentLang === 'en' ? monthNamesEn : monthNamesVi;
      let optsHtml = `<option value="all">${names[0]}</option>`;
      for (let m = 1; m <= 12; m++) {
        optsHtml += `<option value="${m}">${names[m]}</option>`;
      }
      fMonthSel.innerHTML = optsHtml;
      fMonthSel.value = curVal;
    }

    // Update Finance Filter Year Dropdown Options
    const fYearSel = document.getElementById('finance-filter-year');
    if (fYearSel) {
      const curYear = fYearSel.value || '2026';
      fYearSel.innerHTML = `<option value="2026">${currentLang === 'en' ? 'Year 2026' : 'Năm 2026'}</option>`;
      fYearSel.value = curYear;
    }

    // Update Sidebar Navigation labels
    const navItemOverview = document.querySelector('[data-view="overview"] [data-i18n]');
    const navItemTasks    = document.querySelector('[data-view="tasks"] [data-i18n]');
    const navItemHealth   = document.querySelector('[data-view="health"] [data-i18n]');
    const navItemSettings = document.querySelector('[data-view="settings"] [data-i18n]');
    if (navItemOverview) navItemOverview.textContent = t('nav_overview');
    if (navItemTasks)    navItemTasks.textContent = t('nav_tasks');
    if (navItemHealth)   navItemHealth.textContent = t('nav_health');
    if (navItemSettings) navItemSettings.textContent = t('nav_settings');

    // Update Finance Nav & Lock Badge
    applyLockState();

    // Update User Guide Modal if rendered
    renderUserGuide();
    if (typeof renderTaskProgressReport === 'function') renderTaskProgressReport();

    // Update AI Copilot placeholders & status
    const isEn = (currentLang === 'en');
    const aiInput = document.getElementById('ai-chat-input');
    if (aiInput) {
      aiInput.placeholder = isEn
        ? 'Ask: add task, log expense, switch view...'
        : 'Yêu cầu: thêm việc, ghi chi tiêu, chuyển trang...';
    }
    const aiNavBtn = document.getElementById('btn-nav-ai-chat');
    if (aiNavBtn) {
      aiNavBtn.title = isEn ? 'Open Gemini AI Assistant' : 'Mở Trợ lý Gemini AI';
    }
    const aiMiniBubbleEl = document.getElementById('ai-copilot-minimized-bubble');
    if (aiMiniBubbleEl) {
      aiMiniBubbleEl.title = isEn
        ? 'Drag & drop anywhere | Click to open Gemini AI'
        : 'Kéo thả để di chuyển khắp màn hình | Bấm để mở lại Trợ lý Gemini AI';
    }
    if (chatConversation && chatConversation.length === 0) {
      renderInitialWelcomeMessage();
    }
    if (typeof updateGeminiSettingsUI === 'function') updateGeminiSettingsUI();

    // Update Calendar Working Hours Dropdown Options
    const selWorkingHours = document.getElementById('cal-working-hours');
    if (selWorkingHours) {
      const curH = selWorkingHours.value || '6-22';
      selWorkingHours.innerHTML = `
        <option value="0-23">⏱️ 00:00 – 23:00 (${isEn ? '24 Hours' : '24 Giờ'})</option>
        <option value="5-23">⏱️ 05:00 – 23:00 (5h – 23h)</option>
        <option value="6-22">⏱️ 06:00 – 22:00 (6h – 22h)</option>
        <option value="7-20">⏱️ 07:00 – 20:00 (7h – 20h)</option>
        <option value="8-18">⏱️ 08:00 – 18:00 (8h – 18h)</option>
      `;
      selWorkingHours.value = curH;
    }

    // Update Health Sleep Timeline labels
    const sleepLbl = document.getElementById('lbl-sleep-timeline-sleep');
    const wakeLbl = document.getElementById('lbl-sleep-timeline-wake');
    if (sleepLbl) sleepLbl.textContent = isEn ? 'Sleep:' : 'Ngủ:';
    if (wakeLbl) wakeLbl.textContent = isEn ? 'Wake:' : 'Dậy:';

    // Update Health Sleep 90m Mini Pills
    const cyclesRow = document.getElementById('sleep-cycles-pills-row');
    if (cyclesRow) {
      const cycLbl = isEn ? 'Cycle' : 'Kỳ';
      const optLbl = isEn ? '★ Optimal' : '★ Lý tưởng';
      cyclesRow.innerHTML = `
        <span class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800">${cycLbl} 1: 1.5h</span>
        <span class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800">${cycLbl} 2: 3.0h</span>
        <span class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800">${cycLbl} 3: 4.5h</span>
        <span class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800">${cycLbl} 4: 6.0h</span>
        <span class="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-400/40">${cycLbl} 5: 7.5h ${optLbl}</span>
        <span class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800">${cycLbl} 6: 9.0h</span>
      `;
    }

    // Update Modal Health Log labels & unit
    const unitH = document.getElementById('lbl-unit-hours');
    if (unitH) unitH.textContent = isEn ? 'hrs' : 'giờ';
    if (typeof currentHealthLogMode !== 'undefined' && typeof setHealthLogModalMode === 'function') {
      setHealthLogModalMode(currentHealthLogMode);
    }

    // Re-render views
    updateClock();
    if (typeof renderAccountUI === 'function') renderAccountUI();
    if (typeof updateHealth === 'function') updateHealth();
    if (typeof updateCountdownTimer === 'function') updateCountdownTimer();
    renderTasks();
    renderWeeklySchedule();
    render2ColBoard();
    if (typeof renderNewsList === 'function') renderNewsList();
    if (typeof renderFinanceOverviewCard === 'function') renderFinanceOverviewCard();
    if (typeof renderSettingsView === 'function') renderSettingsView();
    if (typeof renderAllFinanceViews === 'function' && financeUnlocked) renderAllFinanceViews();
  }

  // Header quick language toggle button
  document.getElementById('btn-header-lang-toggle')?.addEventListener('click', () => {
    applyLanguage(currentLang === 'vi' ? 'en' : 'vi');
  });

  // Settings language cards click
  document.getElementById('lang-opt-vi')?.addEventListener('click', () => applyLanguage('vi'));
  document.getElementById('lang-opt-en')?.addEventListener('click', () => applyLanguage('en'));

  // ==================== TASK DATA & PROJECTS ====================
  const defaultProjects = [
    { id: 'proj-1', name: 'Design System & UI', color: 'pink' },
    { id: 'proj-2', name: 'API & Backend', color: 'sky' },
    { id: 'proj-3', name: 'Marketing & SEO', color: 'emerald' },
    { id: 'proj-4', name: 'Chiến Lược & Pitch Deck', color: 'amber' },
    { id: 'proj-5', name: 'Cá nhân & Thói quen', color: 'purple' }
  ];
  projects = JSON.parse(localStorage.getItem(getAccountDataKey('projects'))) || JSON.parse(localStorage.getItem('mylife_projects')) || defaultProjects;

  const defaultTaskSettings = { cutoffHour: 22, cutoffMinute: 0, dailyTarget: 5, pomoLength: 25 };
  taskSettings = JSON.parse(localStorage.getItem(getAccountDataKey('task_settings'))) || JSON.parse(localStorage.getItem('mylife_task_settings')) || defaultTaskSettings;

  // Dữ liệu mẫu chuẩn ảnh của user (được nạp khi bấm nút "Nạp mẫu ảnh")
  const mockupDemoTasks = [
    { id: 2001, title: 'Design component library update for Q4 release', description: 'Cập nhật hệ thống button, typography, tokens màu sắc và chuẩn bị tài liệu bàn giao.', project: 'Design System & UI', priority: 'high', status: 'todo', deadline: '2026-10-14T10:00', scheduleDay: 1, scheduleHour: 10, pillColor: 'pill-pink', accentColor: 'pink', subtasks: [{ id: 1, text: 'Review component tokens', completed: true }, { id: 2, text: 'Tạo tài liệu Figma Connect', completed: false }], completed: false },
    { id: 2002, title: 'User feedback analysis & persona refinement', description: 'Tổng hợp 50 phản hồi từ người dùng đợt beta và hoàn thiện chân dung khách hàng.', project: 'API & Backend', priority: 'medium', status: 'todo', deadline: '2026-10-16T14:00', scheduleDay: 3, scheduleHour: 14, pillColor: 'pill-sky', accentColor: 'sky', subtasks: [{ id: 1, text: 'Phân tích survey feedback', completed: true }, { id: 2, text: 'Vẽ empathy map', completed: false }, { id: 3, text: 'Lập báo cáo hành vi', completed: false }, { id: 4, text: 'Họp alignment với team sản phẩm', completed: false }], completed: false },
    { id: 2003, title: 'Prepare pitch deck presentation slides', description: 'Làm slide thuyết trình kêu gọi vốn và demo các tính năng tự động hóa nổi bật.', project: 'Chiến Lược & Pitch Deck', priority: 'high', status: 'todo', deadline: '2026-10-18T09:00', scheduleDay: 5, scheduleHour: 9, pillColor: 'pill-amber', accentColor: 'amber', subtasks: [{ id: 1, text: 'Soạn outline bài thuyết trình 15 slide', completed: true }], completed: false },
    { id: 2004, title: 'Update SEO keywords & metadata for landing page', description: 'Tối ưu lại On-page SEO, canonical URL và các thẻ Open Graph cho social sharing.', project: 'Marketing & SEO', priority: 'medium', status: 'todo', deadline: '2026-10-19T11:00', scheduleDay: 3, scheduleHour: 11, pillColor: 'pill-sky', accentColor: 'emerald', subtasks: [{ id: 1, text: 'Nghiên cứu bộ từ khóa ngách', completed: true }, { id: 2, text: 'Tối ưu title và meta description', completed: true }], completed: false },
    { id: 2005, title: 'Implement authentication API integration', description: 'Xây dựng module xác thực JWT, phân quyền tài chính mã PIN và kiểm tra phiên làm việc.', project: 'API & Backend', priority: 'urgent', status: 'doing', deadline: '2026-10-12T09:00', scheduleDay: 2, scheduleHour: 9, pillColor: 'pill-sky', accentColor: 'sky', subtasks: [{ id: 1, text: 'Thiết kế API schema', completed: true }, { id: 2, text: 'Mã hóa password', completed: true }, { id: 3, text: 'Tạo middleware bảo mật', completed: true }], completed: false },
    { id: 2006, title: 'Client onboarding workflow setup', description: 'Thiết lập quy trình chào đón khách hàng mới tự động qua email và trang dashboard.', project: 'Marketing & SEO', priority: 'high', status: 'doing', deadline: '2026-10-20T12:00', scheduleDay: 2, scheduleHour: 12, pillColor: 'pill-mint', accentColor: 'emerald', subtasks: [{ id: 1, text: 'Viết mẫu email onboarding', completed: true }], completed: false },
    { id: 2007, title: 'Database query optimization', description: 'Đánh index cho các trường bảng giao dịch và tối ưu truy vấn thời gian thực.', project: 'API & Backend', priority: 'medium', status: 'doing', deadline: '2026-10-22T13:00', scheduleDay: 4, scheduleHour: 13, pillColor: 'pill-amber', accentColor: 'amber', subtasks: [{ id: 1, text: 'Profile slow queries', completed: true }], completed: false },
    { id: 2008, title: 'Platform review', description: 'Đánh giá tổng thể hiệu năng và độ ổn định của nền tảng.', project: 'Design System & UI', priority: 'high', status: 'doing', deadline: '2026-11-11T08:00', scheduleDay: 1, scheduleHour: 'allday', pillColor: 'pill-mint', accentColor: 'emerald', subtasks: [], completed: false },
    { id: 2009, title: 'Call with Dan', description: 'Trao đổi về kiến trúc hệ thống và timeline dự án mới.', project: 'API & Backend', priority: 'medium', status: 'todo', deadline: '2026-11-11T09:00', scheduleDay: 1, scheduleHour: 9, pillColor: 'pill-sky', accentColor: 'sky', subtasks: [], completed: false },
    { id: 2010, title: 'Team meeting', description: 'Họp giao ban buổi sáng cập nhật tiến độ công việc trong ngày.', project: 'Cá nhân & Thói quen', priority: 'high', status: 'doing', deadline: '2026-11-11T10:00', scheduleDay: 1, scheduleHour: 10, pillColor: 'pill-pink', accentColor: 'pink', subtasks: [], completed: false },
    { id: 2011, title: 'Outlook calendar', description: 'Đồng bộ lịch hẹn và sự kiện công việc vào Outlook.', project: 'API & Backend', priority: 'low', status: 'todo', deadline: '2026-11-11T11:00', scheduleDay: 1, scheduleHour: 11, pillColor: 'pill-sky', accentColor: 'sky', subtasks: [], completed: false },
    { id: 2012, title: 'Gym', description: 'Tập thể dục rèn luyện thể lực 45 phút.', project: 'Cá nhân & Thói quen', priority: 'medium', status: 'todo', deadline: '2026-11-12T09:00', scheduleDay: 2, scheduleHour: 9, pillColor: 'pill-sky', accentColor: 'sky', subtasks: [], completed: false },
    { id: 2013, title: 'Check Google Sync', description: 'Kiểm tra trạng thái kết nối Google Drive và Calendar.', project: 'Chiến Lược & Pitch Deck', priority: 'low', status: 'todo', deadline: '2026-11-12T14:00', scheduleDay: 2, scheduleHour: 14, pillColor: 'pill-amber', accentColor: 'amber', subtasks: [], completed: false },
    { id: 2014, title: 'Home page', description: 'Hoàn thiện thiết kế trang chủ mới.', project: 'Design System & UI', priority: 'high', status: 'doing', deadline: '2026-11-13T08:00', scheduleDay: 3, scheduleHour: 'allday', pillColor: 'pill-amber', accentColor: 'amber', subtasks: [], completed: false },
    { id: 2015, title: 'Meeting with Ann', description: 'Họp 1-on-1 định hướng sản phẩm tháng 12.', project: 'Chiến Lược & Pitch Deck', priority: 'medium', status: 'todo', deadline: '2026-11-13T09:00', scheduleDay: 3, scheduleHour: 9, pillColor: 'pill-amber', accentColor: 'amber', subtasks: [], completed: false },
    { id: 2016, title: 'Presentation', description: 'Chuẩn bị phòng họp và máy chiếu cho buổi trình chiếu.', project: 'Chiến Lược & Pitch Deck', priority: 'urgent', status: 'todo', deadline: '2026-11-14T08:00', scheduleDay: 4, scheduleHour: 'allday', pillColor: 'pill-mint', accentColor: 'emerald', subtasks: [], completed: false },
    { id: 2017, title: 'Call with Jake', description: 'Thảo luận hợp đồng đối tác chiến lược.', project: 'Chiến Lược & Pitch Deck', priority: 'high', status: 'todo', deadline: '2026-11-14T09:00', scheduleDay: 4, scheduleHour: 9, pillColor: 'pill-amber', accentColor: 'amber', subtasks: [], completed: false },
    { id: 2018, title: 'Coaching', description: 'Phiên chia sẻ kinh nghiệm và hướng dẫn thành viên mới.', project: 'API & Backend', priority: 'medium', status: 'todo', deadline: '2026-11-14T11:00', scheduleDay: 4, scheduleHour: 11, pillColor: 'pill-sky', accentColor: 'sky', subtasks: [], completed: false },
    { id: 2019, title: 'Optimization', description: 'Tối ưu hóa các tiến trình nền và bộ nhớ đệm.', project: 'API & Backend', priority: 'medium', status: 'doing', deadline: '2026-11-14T13:00', scheduleDay: 4, scheduleHour: 13, pillColor: 'pill-amber', accentColor: 'amber', subtasks: [], completed: false }
  ];

  // Load from localStorage or start with sample paper tasks matching mockup
  const savedTasksJson = localStorage.getItem('mylife_tasks');
  let rawTasks = [];
  try { rawTasks = savedTasksJson ? JSON.parse(savedTasksJson) : []; } catch(e) { rawTasks = []; }

  const SAMPLE_PAPER_TASKS = [
    // Calendar events (Monday 11 to Friday 15 Nov 2026)
    { id: 101, title: 'Platform Review', project: 'Design System & UI', priority: 'high', status: 'doing', deadline: '2026-11-11', scheduleDay: 1, scheduleHour: 'allday', pillColor: 'pill-mint', accentColor: 'mint' },
    { id: 102, title: 'Call with Dan', project: 'Marketing & SEO', priority: 'medium', status: 'todo', deadline: '2026-11-11T09:00:00', scheduleDay: 1, scheduleHour: 9, pillColor: 'pill-sky', accentColor: 'sky' },
    { id: 103, title: 'Team Meeting', project: 'Chiến Lược & Pitch Deck', priority: 'high', status: 'todo', deadline: '2026-11-11T10:00:00', scheduleDay: 1, scheduleHour: 10, pillColor: 'pill-pink', accentColor: 'pink' },
    { id: 104, title: 'Outlook Calendar', project: 'API & Backend', priority: 'medium', status: 'todo', deadline: '2026-11-11T11:00:00', scheduleDay: 1, scheduleHour: 11, pillColor: 'pill-sky', accentColor: 'sky' },
    
    { id: 105, title: 'Gym Workout', project: 'Cá nhân & Thói quen', priority: 'low', status: 'todo', deadline: '2026-11-12T09:00:00', scheduleDay: 2, scheduleHour: 9, pillColor: 'pill-sky', accentColor: 'sky' },
    { id: 106, title: 'Team Meeting', project: 'Chiến Lược & Pitch Deck', priority: 'high', status: 'todo', deadline: '2026-11-12T10:00:00', scheduleDay: 2, scheduleHour: 10, pillColor: 'pill-pink', accentColor: 'pink' },
    { id: 107, title: 'Onboarding Review', project: 'Design System & UI', priority: 'medium', status: 'todo', deadline: '2026-11-12T12:00:00', scheduleDay: 2, scheduleHour: 12, pillColor: 'pill-mint', accentColor: 'mint' },
    { id: 108, title: 'Check Google Sync', project: 'API & Backend', priority: 'medium', status: 'todo', deadline: '2026-11-12T14:00:00', scheduleDay: 2, scheduleHour: 14, pillColor: 'pill-amber', accentColor: 'amber' },

    { id: 109, title: 'Home Page Redesign', project: 'Design System & UI', priority: 'high', status: 'doing', deadline: '2026-11-13', scheduleDay: 3, scheduleHour: 'allday', pillColor: 'pill-amber', accentColor: 'amber' },
    { id: 110, title: 'Meeting with Ann', project: 'Marketing & SEO', priority: 'medium', status: 'todo', deadline: '2026-11-13T09:00:00', scheduleDay: 3, scheduleHour: 9, pillColor: 'pill-amber', accentColor: 'amber' },
    { id: 111, title: 'Team Meeting', project: 'Chiến Lược & Pitch Deck', priority: 'high', status: 'todo', deadline: '2026-11-13T10:00:00', scheduleDay: 3, scheduleHour: 10, pillColor: 'pill-pink', accentColor: 'pink' },
    { id: 112, title: 'SEO Optimization', project: 'Marketing & SEO', priority: 'medium', status: 'todo', deadline: '2026-11-13T11:00:00', scheduleDay: 3, scheduleHour: 11, pillColor: 'pill-sky', accentColor: 'sky' },

    { id: 113, title: 'Presentation', project: 'Chiến Lược & Pitch Deck', priority: 'high', status: 'doing', deadline: '2026-11-14', scheduleDay: 4, scheduleHour: 'allday', pillColor: 'pill-mint', accentColor: 'mint' },
    { id: 114, title: 'Call with Jake', project: 'API & Backend', priority: 'medium', status: 'todo', deadline: '2026-11-14T09:00:00', scheduleDay: 4, scheduleHour: 9, pillColor: 'pill-amber', accentColor: 'amber' },
    { id: 115, title: 'Team Meeting', project: 'Chiến Lược & Pitch Deck', priority: 'high', status: 'todo', deadline: '2026-11-14T10:00:00', scheduleDay: 4, scheduleHour: 10, pillColor: 'pill-pink', accentColor: 'pink' },
    { id: 116, title: 'Coaching Session', project: 'Cá nhân & Thói quen', priority: 'medium', status: 'todo', deadline: '2026-11-14T11:00:00', scheduleDay: 4, scheduleHour: 11, pillColor: 'pill-sky', accentColor: 'sky' },
    { id: 117, title: 'Code Optimization', project: 'API & Backend', priority: 'medium', status: 'todo', deadline: '2026-11-14T13:00:00', scheduleDay: 4, scheduleHour: 13, pillColor: 'pill-amber', accentColor: 'amber' },

    { id: 118, title: 'Team Meeting', project: 'Chiến Lược & Pitch Deck', priority: 'high', status: 'todo', deadline: '2026-11-15T10:00:00', scheduleDay: 5, scheduleHour: 10, pillColor: 'pill-pink', accentColor: 'pink' },
    { id: 119, title: 'Onboarding Review', project: 'Design System & UI', priority: 'medium', status: 'todo', deadline: '2026-11-15T11:00:00', scheduleDay: 5, scheduleHour: 11, pillColor: 'pill-mint', accentColor: 'mint' },
    { id: 120, title: 'Outlook Calendar', project: 'API & Backend', priority: 'medium', status: 'todo', deadline: '2026-11-15T14:00:00', scheduleDay: 5, scheduleHour: 14, pillColor: 'pill-purple', accentColor: 'purple' },

    // Right column Kanban cards
    { id: 121, title: 'Xem báo cáo Q3 & Lập kế hoạch tài chính', project: 'Chiến Lược & Pitch Deck', priority: 'high', status: 'todo', deadline: '2026-10-14', accentColor: 'pink', subtasks: [] },
    { id: 122, title: 'Họp khách hàng doanh nghiệp V2', project: 'API & Backend', priority: 'medium', status: 'todo', deadline: '2026-10-16', accentColor: 'amber', subtasks: [] },
    { id: 123, title: 'Thiết kế UI phong cách Vintage Paper', project: 'Design System & UI', priority: 'high', status: 'doing', deadline: '2026-10-12', accentColor: 'mint', subtasks: [] }
  ];

  if (!rawTasks || rawTasks.length === 0) {
    if (activeAccountId === 'acc-1') {
      rawTasks = SAMPLE_PAPER_TASKS;
    } else {
      rawTasks = [];
    }
  }

  tasks = rawTasks.map(t => ({
    id: t.id || Date.now() + Math.floor(Math.random() * 1000),
    title: t.title || t.text || 'Nhiệm vụ',
    description: t.description || '',
    project: t.project || (projects[0]?.name || 'Design System & UI'),
    priority: t.priority || 'medium',
    status: t.status || (t.completed ? 'done' : 'todo'),
    deadline: t.deadline || '',
    scheduleDay: t.scheduleDay !== undefined ? t.scheduleDay : (t.deadline ? new Date(t.deadline).getDay() : 1),
    scheduleHour: t.scheduleHour !== undefined ? t.scheduleHour : (t.deadline ? new Date(t.deadline).getHours() : 'allday'),
    pillColor: t.pillColor || getPillColorFromProject(t.project || ''),
    accentColor: t.accentColor || getAccentColorFromProject(t.project || ''),
    subtasks: Array.isArray(t.subtasks) ? t.subtasks : [],
    completed: t.status === 'done' || !!t.completed
  }));

  function getPillColorFromProject(pName) {
    if (!pName) return 'pill-purple';
    const proj = (projects || []).find(p => p.name.toLowerCase() === pName.toLowerCase());
    if (proj && proj.color) {
      const colorMap = {
        pink: 'pill-pink',
        sky: 'pill-sky',
        emerald: 'pill-mint',
        mint: 'pill-mint',
        amber: 'pill-amber',
        purple: 'pill-purple',
        rose: 'pill-pink',
        indigo: 'pill-sky',
        teal: 'pill-mint'
      };
      if (colorMap[proj.color]) return colorMap[proj.color];
    }
    if (pName.includes('Design')) return 'pill-pink';
    if (pName.includes('API')) return 'pill-sky';
    if (pName.includes('SEO') || pName.includes('Marketing')) return 'pill-mint';
    if (pName.includes('Pitch') || pName.includes('Chiến Lược')) return 'pill-amber';
    return 'pill-purple';
  }

  function getAccentColorFromProject(pName) {
    if (!pName) return 'purple';
    const proj = (projects || []).find(p => p.name.toLowerCase() === pName.toLowerCase());
    if (proj && proj.color) return proj.color;
    if (pName.includes('Design')) return 'pink';
    if (pName.includes('API')) return 'sky';
    if (pName.includes('SEO') || pName.includes('Marketing')) return 'emerald';
    if (pName.includes('Pitch') || pName.includes('Chiến Lược')) return 'amber';
    return 'purple';
  }

  function saveTasks() {
    localStorage.setItem(getAccountDataKey('tasks'), JSON.stringify(tasks));
    if (activeAccountId === 'acc-1') {
      localStorage.setItem('mylife_tasks', JSON.stringify(tasks));
    }
    const curAcc = savedAccounts.find(a => a.id === activeAccountId);
    const targetId = curAcc?.uid || curAcc?.id || activeAccountId;
    if (window.MyLifeFirebase?.isAvailable() && targetId) {
      window.MyLifeFirebase.syncModuleToCloud(targetId, 'tasks', tasks);
    }
    renderTasks();
    renderDeepTasksView();
    if (typeof renderSmartNotifications === 'function') renderSmartNotifications();
  }

  function saveProjects() {
    localStorage.setItem(getAccountDataKey('projects'), JSON.stringify(projects));
    if (activeAccountId === 'acc-1') {
      localStorage.setItem('mylife_projects', JSON.stringify(projects));
    }
    populateProjectDropdowns();
    renderDeepTasksView();
    const curAcc = savedAccounts.find(a => a.id === activeAccountId);
    const targetId = curAcc?.uid;
    if (window.MyLifeFirebase?.isAvailable() && targetId &&
        window.MyLifeFirebase.auth?.currentUser?.uid === targetId) {
      window.MyLifeFirebase.syncModuleToCloud(targetId, 'projects', projects)
        .catch(err => console.error('[MyLife] Lỗi đồng bộ dự án:', err));
    }
  }

  function saveTaskSettings() {
    localStorage.setItem(getAccountDataKey('task_settings'), JSON.stringify(taskSettings));
    if (activeAccountId === 'acc-1') {
      localStorage.setItem('mylife_task_settings', JSON.stringify(taskSettings));
    }
    updateCountdownTimer();
    renderTasks();
    renderDeepTasksView();
    if (typeof renderSmartNotifications === 'function') renderSmartNotifications();
    const curAcc = savedAccounts.find(a => a.id === activeAccountId);
    const targetId = curAcc?.uid;
    if (window.MyLifeFirebase?.isAvailable() && targetId &&
        window.MyLifeFirebase.auth?.currentUser?.uid === targetId) {
      window.MyLifeFirebase.syncModuleToCloud(targetId, 'taskSettings', taskSettings)
        .catch(err => console.error('[MyLife] Lỗi đồng bộ cài đặt công việc:', err));
    }
  }

  function getAccentBarClass(colorName) {
    switch(colorName) {
      case 'pink':    return 'bg-pink-500';
      case 'sky':     return 'bg-sky-500';
      case 'amber':   return 'bg-amber-500';
      case 'emerald': return 'bg-emerald-500';
      case 'orange':  return 'bg-orange-500';
      case 'purple':  return 'bg-purple-500';
      default:        return 'bg-blue-500';
    }
  }

  function formatShortDate(dtStr) {
    if (!dtStr) return t('today');
    const d = new Date(dtStr);
    if (isNaN(d.getTime())) return dtStr;
    const mStr = i18nData[currentLang].months_short[d.getMonth()];
    if (currentLang === 'vi') {
      return `${d.getDate()} ${mStr}`;
    }
    return `${mStr} ${d.getDate()}`;
  }

  /* ============================================================
   * MAIN DUAL-PANEL RENDERING: CALENDAR & 2-COLUMN BOARD
   * ============================================================ */
  function renderDeepTasksView() {
    populateProjectDropdowns();
    renderWeeklySchedule();
    render2ColBoard();
    renderPaperHealthWidget();
  }

  function renderPaperHealthWidget() {
    const sleepEl = document.getElementById('paper-health-sleep');
    const stepsEl = document.getElementById('paper-health-steps');
    const heartEl = document.getElementById('paper-health-heart');
    
    if (sleepEl) {
      const hrs = Math.floor(healthData.sleepHours || 7);
      const mins = Math.round(((healthData.sleepHours || 7.5) % 1) * 60);
      sleepEl.textContent = `${hrs}g ${mins > 0 ? mins + 'p' : '00p'}`;
    }
    if (stepsEl) {
      const nf = new Intl.NumberFormat('vi-VN');
      stepsEl.textContent = nf.format(healthData.steps || 7230);
    }
    if (heartEl && !heartEl.textContent) {
      heartEl.textContent = '72';
    }
  }

  // Handle "Đo lại" button in right column health widget
  document.getElementById('btn-paper-health-measure')?.addEventListener('click', (e) => {
    e.stopPropagation();
    const heartEl = document.getElementById('paper-health-heart');
    const btn = document.getElementById('btn-paper-health-measure');
    if (btn) btn.textContent = 'Đo...';
    setTimeout(() => {
      const randomBpm = 68 + Math.floor(Math.random() * 12);
      if (heartEl) heartEl.textContent = randomBpm;
      if (btn) btn.textContent = 'Đo lại';
      if (typeof showHint === 'function') showHint(`Nhịp tim đo được: ${randomBpm} BPM (Bình thường & Khỏe mạnh)`);
    }, 380);
  });

  // ==================== PANEL 1: CALENDAR SCHEDULE GRID ====================
  // Selected base date for schedule navigation (supports any date in the entire year)
  let currentScheduleDate = new Date(); // Mặc định mở ngay tuần hiện tại chứa hôm nay

  function getMondayOfWeek(d) {
    const date = new Date(d);
    const day = date.getDay(); // 0: Sun, 1: Mon, ...
    const diff = (day === 0 ? -6 : 1) - day; // adjust so Monday is first
    date.setDate(date.getDate() + diff);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  function getISOWeekNumber(d) {
    const target = new Date(d.valueOf());
    const dayNr = (d.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
  }

  let scheduleMonday = getMondayOfWeek(currentScheduleDate);

  const calWeekLabel       = document.getElementById('calendar-week-label');
  const calPrevWeekBtn     = document.getElementById('btn-cal-prev-week');
  const calTodayBtn        = document.getElementById('btn-cal-today');
  const calNextWeekBtn     = document.getElementById('btn-cal-next-week');
  const calAddEventBtn     = document.getElementById('btn-cal-add-event');
  const calJumpDatePicker  = document.getElementById('cal-jump-date-picker');
  const scheduleMatrixBody = document.getElementById('schedule-matrix-body');
  const calEventsCountEl   = document.getElementById('cal-events-count');

  calPrevWeekBtn?.addEventListener('click', () => {
    scheduleMonday.setDate(scheduleMonday.getDate() - 7);
    syncDatePickerValue();
    renderWeeklySchedule();
  });

  calNextWeekBtn?.addEventListener('click', () => {
    scheduleMonday.setDate(scheduleMonday.getDate() + 7);
    syncDatePickerValue();
    renderWeeklySchedule();
  });

  calTodayBtn?.addEventListener('click', () => {
    scheduleMonday = getMondayOfWeek(new Date());
    syncDatePickerValue();
    renderWeeklySchedule();
  });

  // Mở bộ chọn ngày khi bấm vào tiêu đề tuần
  calWeekLabel?.addEventListener('click', () => {
    if (calJumpDatePicker?.showPicker) {
      calJumpDatePicker.showPicker();
    } else {
      calJumpDatePicker?.focus();
      calJumpDatePicker?.click();
    }
  });

  calJumpDatePicker?.addEventListener('change', (e) => {
    if (e.target.value) {
      const parts = e.target.value.split('-');
      if (parts.length === 3) {
        const picked = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        scheduleMonday = getMondayOfWeek(picked);
        renderWeeklySchedule();
      }
    }
  });

  function syncDatePickerValue() {
    if (!calJumpDatePicker) return;
    const y = scheduleMonday.getFullYear();
    const m = String(scheduleMonday.getMonth() + 1).padStart(2, '0');
    const d = String(scheduleMonday.getDate()).padStart(2, '0');
    calJumpDatePicker.value = `${y}-${m}-${d}`;
  }

  calAddEventBtn?.addEventListener('click', () => { openTaskDetailModal(null, { scheduleHour: 9 }); });

  document.getElementById('cal-working-hours')?.addEventListener('change', (e) => {
    localStorage.setItem('mylife_cal_working_hours', e.target.value);
    renderWeeklySchedule();
  });

  function getScheduleWeekDates() {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(scheduleMonday);
      d.setDate(scheduleMonday.getDate() + i);
      const dayName = i18nData[currentLang].days_short[(i + 1) % 7];
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const dateNum = d.getDate();
      const dtStr = String(dateNum).padStart(2, '0');
      const dayIdx = (i + 1) % 7;
      // Format chuẩn ảnh mẫu: Thứ 2 (11), Thứ 3 (12)...
      const formattedHeader = currentLang === 'vi' 
        ? (dayIdx === 0 ? `CN (${dateNum})` : `Thứ ${dayIdx + 1} (${dateNum})`)
        : `${dayName} (${dateNum})`;
      days.push({
        dayIndex: dayIdx,
        dayName: dayName,
        dateNum: dateNum,
        monthNum: d.getMonth() + 1,
        year: y,
        dateStr: formattedHeader,
        isoDate: `${y}-${m}-${dtStr}`
      });
    }
    return days;
  }

  function renderWeeklySchedule() {
    if (!scheduleMatrixBody) return;
    const weekDays = getScheduleWeekDates();
    syncDatePickerValue();
    
    if (calWeekLabel) {
      const weekNum = getISOWeekNumber(scheduleMonday);
      const startD = String(weekDays[0].dateNum).padStart(2, '0');
      const startM = String(weekDays[0].monthNum).padStart(2, '0');
      const endD = String(weekDays[6].dateNum).padStart(2, '0');
      const endM = String(weekDays[6].monthNum).padStart(2, '0');
      const yr = weekDays[6].year;
      if (currentLang === 'vi') {
        calWeekLabel.textContent = `Tuần ${weekNum} (${startD}/${startM} - ${endD}/${endM}/${yr})`;
      } else {
        calWeekLabel.textContent = `Week ${weekNum} (${startD}/${startM} - ${endD}/${endM}/${yr})`;
      }
    }

    // Update table th day labels
    document.querySelectorAll('.cal-day-th').forEach((th, idx) => {
      if (weekDays[idx]) {
        th.innerHTML = `<span class="block text-slate-900 dark:text-white font-black text-center truncate" title="${weekDays[idx].dateStr}">${weekDays[idx].dateStr}</span>`;
      }
    });

    // Tùy chỉnh khung giờ làm việc trên bảng biểu (mặc định 06:00 - 22:00 hoặc theo tùy chọn của người dùng, hỗ trợ full 24h 00:00 - 23:00)
    let startHour = 6;
    let endHour = 22;
    const workingHoursVal = localStorage.getItem('mylife_cal_working_hours') || '6-22';
    const selWorkingHours = document.getElementById('cal-working-hours');
    if (selWorkingHours) {
      selWorkingHours.value = workingHoursVal;
      const parts = workingHoursVal.split('-');
      if (parts.length === 2) {
        startHour = Number(parts[0]);
        endHour = Number(parts[1]);
      }
    }

    const hours = [{ key: 'allday', label: t('allday_label') }];
    for (let h = startHour; h <= endHour; h++) {
      let label = '';
      if (currentLang === 'en') {
        label = h === 0 ? '12 am' : h < 12 ? `${h} am` : h === 12 ? '12 pm' : `${h - 12} pm`;
      } else {
        label = `${String(h).padStart(2, '0')}:00`;
      }
      hours.push({ key: h, label });
    }
    const displayHourKeys = hours.filter(x => x.key !== 'allday').map(x => x.key);

    const filtered = getFilteredTasks();
    scheduleMatrixBody.innerHTML = '';
    let totalCalEvents = 0;

    hours.forEach(hr => {
      const tr = document.createElement('tr');
      tr.className = 'border-b border-slate-100 hover:bg-slate-50/40 transition-colors';

      let rowHtml = `<td class="cal-time-cell py-2.5 px-2 border-r border-slate-200 text-slate-400 font-semibold text-center text-[11px] bg-slate-50/50">${hr.label}</td>`;

      weekDays.forEach((day) => {
        const slotTasks = filtered.filter(t => {
          // 1. Kiểm tra khớp ngày
          let matchesDay = false;
          if (t.deadline) {
            const tdStr = String(t.deadline).split('T')[0];
            if (tdStr === day.isoDate) {
              matchesDay = true;
            }
          }
          // Fallback theo thứ trong tuần chỉ khi task không có deadline cụ thể
          if (!matchesDay && (!t.deadline || t.deadline === '') && t.scheduleDay !== undefined) {
            const sDay = Number(t.scheduleDay);
            if (sDay === day.dayIndex || (sDay === 7 && day.dayIndex === 0) || (sDay === 0 && day.dayIndex === 7)) {
              matchesDay = true;
            }
          }

          if (!matchesDay) return false;

          // 2. Kiểm tra khớp giờ (xử lý chính xác cả số nguyên 20, chuỗi '20:00', '20h', v.v.)
          let rawHr = t.scheduleHour;
          let parsedHr = 'allday';
          if (rawHr !== undefined && rawHr !== null && rawHr !== '' && rawHr !== 'allday') {
            if (typeof rawHr === 'number') {
              parsedHr = rawHr;
            } else {
              const str = String(rawHr).trim();
              const m = str.match(/^(\d{1,2})/);
              if (m) parsedHr = parseInt(m[1], 10);
            }
          } else if (t.deadline && String(t.deadline).includes('T')) {
            const td = new Date(t.deadline);
            if (!isNaN(td.getTime())) parsedHr = td.getHours();
          }

          if (hr.key === 'allday') {
            // Nhiệm vụ cả ngày HOẶC nằm ngoài khung giờ hiển thị thì hiện ở hàng Cả ngày để không bị ẩn
            return parsedHr === 'allday' || !displayHourKeys.includes(parsedHr);
          } else {
            return parsedHr === hr.key;
          }
        });

        totalCalEvents += slotTasks.length;
        let pillsHtml = '';
        slotTasks.forEach(t => {
          const pCol = t.pillColor || 'pill-sky';
          pillsHtml += `
            <div class="cal-pill ${pCol}" data-id="${t.id}" title="${t.title} (${t.project})">
              ${t.title}
            </div>
          `;
        });

        rowHtml += `
          <td class="cal-slot-cell border-r border-slate-100" data-day="${day.dayIndex}" data-hour="${hr.key}">
            ${pillsHtml}
          </td>
        `;
      });

      tr.innerHTML = rowHtml;
      scheduleMatrixBody.appendChild(tr);
    });

    if (calEventsCountEl) {
      calEventsCountEl.textContent = `${totalCalEvents} ${currentLang === 'vi' ? 'sự kiện' : 'events'}`;
    }

    // Attach click events
    document.querySelectorAll('.cal-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = Number(pill.dataset.id);
        const task = tasks.find(t => t.id === id);
        if (task) openTaskDetailModal(task);
      });
    });

    document.querySelectorAll('.cal-slot-cell').forEach(cell => {
      cell.addEventListener('click', (e) => {
        if (e.target.closest('.cal-pill')) return;
        const d = Number(cell.dataset.day);
        const h = cell.dataset.hour === 'allday' ? 'allday' : Number(cell.dataset.hour);
        const dayObj = weekDays.find(w => w.dayIndex === d);
        let dlStr = '';
        if (dayObj) {
          const y = dayObj.year;
          const m = String(dayObj.monthNum).padStart(2, '0');
          const dt = String(dayObj.dateNum).padStart(2, '0');
          const hrStr = h === 'allday' ? '09:00' : `${String(h).padStart(2, '0')}:00`;
          dlStr = `${y}-${m}-${dt}T${hrStr}`;
        }
        openTaskDetailModal(null, { scheduleDay: d, scheduleHour: h, deadline: dlStr });
      });
    });
  }

  // ==================== PANEL 2: 2-COLUMN BOARD (TO-DO & IN PROGRESS) ====================
  const cardsColTodo     = document.getElementById('cards-col-todo');
  const cardsColDoing    = document.getElementById('cards-col-doing');
  const badgeCountTodo   = document.getElementById('badge-count-todo');
  const badgeCountDoing  = document.getElementById('badge-count-doing');
  const badgeCountDone   = document.getElementById('badge-count-done');
  const containerDoneDrawer = document.getElementById('container-done-drawer');
  const btnToggleDoneDrawer = document.getElementById('btn-toggle-done-drawer');
  const iconDoneDrawer   = document.getElementById('icon-done-drawer');
  const btnClearAllDone  = document.getElementById('btn-clear-all-done-tasks');

  btnToggleDoneDrawer?.addEventListener('click', () => {
    const isHidden = containerDoneDrawer?.classList.toggle('hidden');
    if (iconDoneDrawer) iconDoneDrawer.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(90deg)';
  });

  btnClearAllDone?.addEventListener('click', () => {
    const doneTasks = tasks.filter(t => t.status === 'done');
    if (!doneTasks.length) {
      alert(currentLang === 'vi' ? 'Không có công việc nào đã hoàn thành để dọn dẹp!' : 'No completed tasks to clean up!');
      return;
    }
    if (confirm(currentLang === 'vi' ? `Xóa vĩnh viễn ${doneTasks.length} việc đã xong?` : `Permanently delete ${doneTasks.length} completed tasks?`)) {
      tasks = tasks.filter(t => t.status !== 'done');
      saveTasks();
    }
  });

  const taskFilterSearch = document.getElementById('task-filter-search');
  taskFilterSearch?.addEventListener('input', () => {
    renderWeeklySchedule();
    render2ColBoard();
  });

  function getFilteredTasks() {
    const q = (taskFilterSearch?.value || '').toLowerCase().trim();
    return tasks.filter(t => {
      if (q && !t.title.toLowerCase().includes(q) && !(t.description || '').toLowerCase().includes(q)) return false;
      return true;
    });
  }

  function render2ColBoard() {
    const filtered = getFilteredTasks();
    const todoList = filtered.filter(t => t.status === 'todo');
    const doingList = filtered.filter(t => t.status === 'doing');
    const doneList = filtered.filter(t => t.status === 'done');

    if (badgeCountTodo)  badgeCountTodo.textContent = todoList.length;
    if (badgeCountDoing) badgeCountDoing.textContent = doingList.length;
    if (badgeCountDone)  badgeCountDone.textContent = doneList.length;

    // Render To-do Cards
    if (cardsColTodo) {
      cardsColTodo.innerHTML = '';
      if (!todoList.length) {
        cardsColTodo.innerHTML = `<div class="p-6 text-center text-slate-400 text-xs italic border border-dashed border-sky-200 rounded-2xl bg-white/60">${currentLang === 'vi' ? 'Chưa có việc cần làm. Bấm "Thêm thẻ" bên dưới!' : 'No to-do tasks. Click "Add card" below!'}</div>`;
      } else {
        todoList.forEach(t => cardsColTodo.appendChild(createImage2Card(t, 'todo')));
      }
    }

    // Render In Progress Cards
    if (cardsColDoing) {
      cardsColDoing.innerHTML = '';
      if (!doingList.length) {
        cardsColDoing.innerHTML = `<div class="p-6 text-center text-slate-400 text-xs italic border border-dashed border-sky-200 rounded-2xl bg-white/60">${currentLang === 'vi' ? 'Chưa có việc đang làm. Bấm "▶ Bắt đầu" ở Cần làm để chuyển sang!' : 'No in-progress tasks. Click "▶ Start" on To-do to move here!'}</div>`;
      } else {
        doingList.forEach(t => cardsColDoing.appendChild(createImage2Card(t, 'doing')));
      }
    }

    // Render Done Drawer
    if (containerDoneDrawer) {
      containerDoneDrawer.innerHTML = '';
      if (!doneList.length) {
        containerDoneDrawer.innerHTML = `<p class="text-xs text-slate-400 py-2 italic text-center">${currentLang === 'vi' ? 'Chưa có việc nào hoàn thành.' : 'No completed tasks yet.'}</p>`;
      } else {
        doneList.forEach(t => {
          const div = document.createElement('div');
          div.className = 'flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs shadow-xs';
          div.innerHTML = `
            <div class="flex items-center gap-2 min-w-0 pr-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span class="line-through text-slate-400 truncate">${t.title}</span>
            </div>
            <div class="flex items-center gap-1 shrink-0">
              <button class="btn-restore-task px-2 py-0.5 text-[10px] font-semibold text-blue-600 hover:bg-blue-50 rounded" data-id="${t.id}" title="Làm lại">
                <i class="fa-solid fa-rotate-left mr-0.5"></i>${currentLang === 'vi' ? 'Lại' : 'Redo'}
              </button>
              <button class="btn-delete-task p-1 text-slate-400 hover:text-rose-600" data-id="${t.id}" title="Xóa">
                <i class="fa-solid fa-trash-can text-[10px]"></i>
              </button>
            </div>
          `;
          containerDoneDrawer.appendChild(div);
        });
      }
    }

    setupDragAndDrop();
    attachCardActionListeners();
  }

  function createImage2Card(t, columnStatus) {
    const card = document.createElement('div');
    card.className = 'clean-task-card p-3 bg-white rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#1e293b] hover:shadow-[3px_3px_0px_#1e293b] transition-all flex flex-col justify-between gap-2.5 cursor-grab select-none';
    card.draggable = true;
    card.dataset.id = t.id;

    const barClass = getAccentBarClass(t.accentColor || 'pink');
    const subTotal = t.subtasks?.length || 0;
    const shortDate = formatShortDate(t.deadline);

    card.innerHTML = `
      <div>
        <div class="w-10 h-1 rounded-full ${barClass} mb-2"></div>
        <h5 class="font-black text-slate-900 text-xs leading-snug hover:text-indigo-600 transition-colors cursor-pointer btn-card-title-click" data-id="${t.id}">
          ${t.title}
        </h5>
      </div>

      <div class="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1 text-slate-600 font-bold text-[10px]">
            <i class="fa-regular fa-calendar text-[9px] text-slate-400"></i>
            <span>${shortDate}</span>
          </span>
          ${subTotal > 0 ? `
            <span class="inline-flex items-center gap-1 text-slate-500 text-[10px]">
              <i class="fa-regular fa-comment-dots text-[9px] text-slate-400"></i>
              <span>${subTotal}</span>
            </span>
          ` : ''}
        </div>

        <div class="flex items-center gap-1.5">
          ${columnStatus === 'todo' ? `
            <span class="px-2 py-0.5 rounded-md bg-amber-400 text-slate-900 border border-slate-900 text-[10px] font-black shadow-[1px_1px_0px_#1e293b]">${currentLang === 'vi' ? 'Ưu tiên' : 'Priority'}</span>
            <button class="btn-advance-status px-1.5 py-0.5 rounded-md bg-sky-100 hover:bg-sky-600 hover:text-white text-sky-800 font-bold text-[10px] border border-slate-900 shadow-[1px_1px_0px_#1e293b] transition-all flex items-center gap-0.5" data-id="${t.id}" data-to="doing" title="${currentLang === 'vi' ? 'Bắt đầu' : 'Start'}">
              <i class="fa-solid fa-arrow-right text-[8px]"></i>
            </button>
          ` : `
            <span class="px-2 py-0.5 rounded-md bg-teal-400 text-slate-900 border border-slate-900 text-[10px] font-black shadow-[1px_1px_0px_#1e293b]">${currentLang === 'vi' ? 'Đang làm' : 'Doing'}</span>
            <button class="btn-advance-status px-1 py-0.5 rounded text-slate-400 hover:text-slate-700 text-[9px]" data-id="${t.id}" data-to="todo" title="${currentLang === 'vi' ? 'Về To-do' : 'To Todo'}">
              <i class="fa-solid fa-arrow-left"></i>
            </button>
            <button class="btn-advance-status px-1.5 py-0.5 rounded-md bg-emerald-300 hover:bg-emerald-500 text-slate-900 font-bold text-[10px] border border-slate-900 shadow-[1px_1px_0px_#1e293b] transition-all flex items-center gap-0.5" data-id="${t.id}" data-to="done" title="${currentLang === 'vi' ? 'Hoàn thành' : 'Done'}">
              <i class="fa-solid fa-check text-[8px]"></i>
            </button>
          `}
        </div>
      </div>
    `;

    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-advance-status')) return;
      openTaskDetailModal(t);
    });

    return card;
  }

  function attachCardActionListeners() {
    document.querySelectorAll('.btn-card-title-click').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.id);
        const task = tasks.find(t => t.id === id);
        if (task) openTaskDetailModal(task);
      });
    });

    document.querySelectorAll('.btn-advance-status').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = Number(btn.dataset.id);
        const nextStatus = btn.dataset.to;
        const task = tasks.find(t => t.id === id);
        if (task) {
          task.status = nextStatus;
          task.completed = (nextStatus === 'done');
          saveTasks();
        }
      });
    });

    document.querySelectorAll('.btn-restore-task').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.id);
        const task = tasks.find(t => t.id === id);
        if (task) {
          task.status = 'todo';
          task.completed = false;
          saveTasks();
        }
      });
    });

    document.querySelectorAll('.btn-delete-task').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.id);
        if (confirm(currentLang === 'vi' ? 'Xóa công việc này?' : 'Delete this task?')) {
          tasks = tasks.filter(t => t.id !== id);
          saveTasks();
        }
      });
    });
  }

  function setupDragAndDrop() {
    const cards = document.querySelectorAll('.clean-task-card');
    const dropzones = document.querySelectorAll('.kanban-dropzone');

    cards.forEach(card => {
      card.addEventListener('dragstart', () => {
        card.classList.add('opacity-40');
        window._draggedTaskId = Number(card.dataset.id);
      });
      card.addEventListener('dragend', () => card.classList.remove('opacity-40'));
    });

    dropzones.forEach(zone => {
      zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('bg-blue-50/50'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('bg-blue-50/50'));
      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('bg-blue-50/50');
        const targetStatus = zone.dataset.status;
        const taskId = window._draggedTaskId;
        if (taskId && targetStatus) {
          const task = tasks.find(t => t.id === taskId);
          if (task && task.status !== targetStatus) {
            task.status = targetStatus;
            task.completed = (targetStatus === 'done');
            saveTasks();
          }
        }
      });
    });
  }

  document.getElementById('btn-add-card-todo')?.addEventListener('click', () => {
    openTaskDetailModal(null, { status: 'todo' });
  });
  document.getElementById('btn-add-card-doing')?.addEventListener('click', () => {
    openTaskDetailModal(null, { status: 'doing' });
  });

  // Buttons to load demo tasks and clear boards
  function loadDemoMockupTasks() {
    tasks = JSON.parse(JSON.stringify(mockupDemoTasks));
    saveTasks();
    alert(currentLang === 'vi' ? 'Đã nạp toàn bộ dữ liệu mẫu chuẩn theo ảnh chụp!' : 'Successfully loaded demo tasks matching the screenshot!');
  }

  function clearAllTaskBoards() {
    if (confirm(currentLang === 'vi' ? 'Bạn có chắc chắn muốn để trắng toàn bộ bảng biểu công việc & lịch trình?' : 'Are you sure you want to clear all tasks and calendar events?')) {
      tasks = [];
      saveTasks();
      alert(currentLang === 'vi' ? 'Bảng biểu đã được để trắng hoàn toàn!' : 'All boards are now blank!');
    }
  }

  document.getElementById('btn-load-demo-tasks')?.addEventListener('click', loadDemoMockupTasks);
  document.getElementById('btn-settings-load-demo')?.addEventListener('click', loadDemoMockupTasks);
  document.getElementById('btn-settings-clear-tasks')?.addEventListener('click', clearAllTaskBoards);

  document.getElementById('btn-settings-reset-all')?.addEventListener('click', () => {
    if (confirm(currentLang === 'vi' ? 'CẢNH BÁO: Đặt lại toàn bộ dữ liệu ứng dụng về mặc định?' : 'WARNING: Reset all application data to default?')) {
      localStorage.clear();
      location.reload();
    }
  });

  // ==================== OVERVIEW CARD 2 (CÔNG VIỆC & ƯU TIÊN) ====================
  let overviewActiveTab = 'todo';
  const taskListEl          = document.getElementById('task-list');
  const overviewTabTodo     = document.getElementById('overview-tab-todo');
  const overviewTabDoing    = document.getElementById('overview-tab-doing');
  const overviewBadgeTodo   = document.getElementById('overview-badge-todo');
  const overviewBadgeDoing  = document.getElementById('overview-badge-doing');
  const btnQuickAddOverview = document.getElementById('btn-quick-add-overview');
  const taskFormEl          = document.getElementById('task-form');
  const taskInputEl         = document.getElementById('task-input');
  const taskPriorityEl      = document.getElementById('task-priority');
  const btnShowAddTask      = document.getElementById('btn-show-add-task');
  const btnCancelTask       = document.getElementById('btn-cancel-task');
  const taskExpandContainer = document.getElementById('task-expand-container');
  const btnToggleTaskExpand = document.getElementById('btn-toggle-task-expand');
  const taskCompletionStats = document.getElementById('task-completion-stats');
  const btnClearCompleted   = document.getElementById('btn-clear-completed');
  let overviewExpanded = false;

  overviewTabTodo?.addEventListener('click', () => {
    overviewActiveTab = 'todo';
    overviewTabTodo.classList.add('bg-white', 'text-indigo-600', 'shadow-sm');
    overviewTabTodo.classList.remove('text-slate-600');
    overviewTabDoing.classList.remove('bg-white', 'text-indigo-600', 'shadow-sm');
    overviewTabDoing.classList.add('text-slate-600');
    renderTasks();
  });

  overviewTabDoing?.addEventListener('click', () => {
    overviewActiveTab = 'doing';
    overviewTabDoing.classList.add('bg-white', 'text-indigo-600', 'shadow-sm');
    overviewTabDoing.classList.remove('text-slate-600');
    overviewTabTodo.classList.remove('bg-white', 'text-indigo-600', 'shadow-sm');
    overviewTabTodo.classList.add('text-slate-600');
    renderTasks();
  });

  btnToggleTaskExpand?.addEventListener('click', () => {
    overviewExpanded = !overviewExpanded;
    btnToggleTaskExpand.textContent = overviewExpanded 
      ? (currentLang === 'vi' ? 'Thu gọn ↑' : 'Collapse ↑')
      : (currentLang === 'vi' ? 'Xem tất cả nhiệm vụ ↓' : 'View all tasks ↓');
    renderTasks();
  });

  btnShowAddTask?.addEventListener('click', () => { taskFormEl?.classList.remove('hidden'); taskInputEl?.focus(); });
  btnQuickAddOverview?.addEventListener('click', () => { taskFormEl?.classList.remove('hidden'); taskInputEl?.focus(); });
  btnCancelTask?.addEventListener('click', () => { taskFormEl?.classList.add('hidden'); });

  taskFormEl?.addEventListener('submit', (e) => {
    e.preventDefault();
    const txt = taskInputEl?.value.trim();
    if (!txt) return;
    const newTask = {
      id: Date.now(),
      title: txt,
      description: '',
      project: projects[0]?.name || 'Cá nhân & Thói quen',
      priority: taskPriorityEl?.value || 'medium',
      status: overviewActiveTab,
      deadline: new Date().toISOString().substring(0, 16),
      scheduleDay: new Date().getDay(),
      scheduleHour: 9,
      pillColor: 'pill-sky',
      accentColor: 'sky',
      subtasks: [],
      completed: false
    };
    tasks.unshift(newTask);
    saveTasks();
    taskInputEl.value = '';
    taskFormEl.classList.add('hidden');
  });

  btnClearCompleted?.addEventListener('click', () => {
    const done = tasks.filter(t => t.completed || t.status === 'done');
    if (!done.length) {
      alert(currentLang === 'vi' ? 'Không có việc hoàn thành nào cần dọn dẹp.' : 'No completed tasks to clean up.');
      return;
    }
    if (confirm(currentLang === 'vi' ? `Dọn dẹp ${done.length} việc đã xong?` : `Clean up ${done.length} completed tasks?`)) {
      tasks = tasks.filter(t => !t.completed && t.status !== 'done');
      saveTasks();
    }
  });

  function renderTasks() {
    if (!taskListEl) return;
    taskListEl.innerHTML = '';

    const todoTasks = tasks.filter(t => t.status === 'todo');
    const doingTasks = tasks.filter(t => t.status === 'doing');
    const doneCount = tasks.filter(t => t.status === 'done' || t.completed).length;

    if (overviewBadgeTodo)  overviewBadgeTodo.textContent = todoTasks.length;
    if (overviewBadgeDoing) overviewBadgeDoing.textContent = doingTasks.length;
    if (taskCompletionStats) {
      taskCompletionStats.innerHTML = currentLang === 'vi'
        ? `<i class="fa-regular fa-circle-check text-emerald-500 mr-1"></i>Đã xong: <b>${doneCount}/${tasks.length}</b> • Mục tiêu: <b>${taskSettings.dailyTarget} việc</b>`
        : `<i class="fa-regular fa-circle-check text-emerald-500 mr-1"></i>Completed: <b>${doneCount}/${tasks.length}</b> • Goal: <b>${taskSettings.dailyTarget} tasks</b>`;
    }

    const currentList = overviewActiveTab === 'todo' ? todoTasks : doingTasks;

    if (!currentList.length) {
      taskListEl.innerHTML = `
        <div class="py-7 text-center">
          <div class="w-9 h-9 rounded-xl bg-slate-50 text-slate-400 mx-auto flex items-center justify-center text-xs mb-2 border border-slate-200/60">
            <i class="fa-solid fa-inbox"></i>
          </div>
          <p class="text-xs text-slate-400 italic">${currentLang === 'vi' ? `Chưa có nhiệm vụ nào trong mục "${overviewActiveTab === 'todo' ? 'Cần làm' : 'Đang làm'}".` : `No tasks in "${overviewActiveTab === 'todo' ? 'To-do' : 'In Progress'}".`}</p>
          <button type="button" class="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50/80 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition-all inline-flex items-center gap-1.5" onclick="document.getElementById('task-form')?.classList.remove('hidden');document.getElementById('task-input')?.focus();">
            <i class="fa-solid fa-plus text-[10px]"></i> ${currentLang === 'vi' ? 'Thêm nhiệm vụ mới' : 'Add new task'}
          </button>
        </div>`;
      if (taskExpandContainer) taskExpandContainer.classList.add('hidden');
      return;
    }

    const displayTasks = overviewExpanded ? currentList : currentList.slice(0, 4);
    if (taskExpandContainer) {
      taskExpandContainer.classList.toggle('hidden', currentList.length <= 4);
    }

    displayTasks.forEach(t => {
      const card = document.createElement('div');
      card.className = 'clean-task-card p-3 bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-2 cursor-pointer';
      
      const barClass = getAccentBarClass(t.accentColor || 'pink');
      const subTotal = t.subtasks?.length || 0;
      const shortDate = formatShortDate(t.deadline);

      card.innerHTML = `
        <div>
          <div class="w-10 h-1.5 rounded-full ${barClass} mb-1.5"></div>
          <div class="flex items-start justify-between gap-2">
            <h5 class="font-bold text-slate-900 text-xs leading-snug hover:text-indigo-600 transition-colors flex-1">
              ${t.title}
            </h5>
            <button class="btn-quick-move px-2 py-0.5 rounded-md text-[10px] font-bold ${t.status === 'todo' ? 'bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white'} transition-colors shrink-0" data-id="${t.id}">
              ${t.status === 'todo' ? (currentLang === 'vi' ? '▶ Bắt đầu' : '▶ Start') : (currentLang === 'vi' ? '✓ Xong' : '✓ Done')}
            </button>
          </div>
        </div>

        <div class="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span class="inline-flex items-center gap-1"><i class="fa-regular fa-calendar text-[10px]"></i>${shortDate}</span>
          ${subTotal > 0 ? `<span class="inline-flex items-center gap-1"><i class="fa-regular fa-comment-dots text-[10px]"></i>${subTotal}</span>` : ''}
          <span class="truncate max-w-[120px] text-slate-500 font-medium">${t.project}</span>
        </div>
      `;

      card.querySelector('.btn-quick-move')?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (t.status === 'todo') {
          t.status = 'doing';
          saveTasks();
          // Auto switch to 'doing' tab so user immediately sees the task in 'Đang làm'
          overviewTabDoing?.click();
          showHint(currentLang === 'vi' ? `Đã chuyển "${t.title}" sang mục Đang làm!` : `Moved "${t.title}" to In Progress!`);
        } else {
          t.status = 'done';
          t.completed = true;
          saveTasks();
          showHint(currentLang === 'vi' ? `Hoàn thành xuất sắc: "${t.title}"!` : `Completed: "${t.title}"!`);
        }
      });

      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-quick-move')) return;
        openTaskDetailModal(t);
      });
      taskListEl.appendChild(card);
    });
  }

  function populateProjectDropdowns() {
    const modalSelect = document.getElementById('task-detail-project');
    if (modalSelect) {
      const curVal = modalSelect.value;
      modalSelect.innerHTML = projects.map(p => `<option value="${escapeHtml(p.name)}">${escapeHtml(p.name)}</option>`).join('') +
        `<option value="__add_new__" class="font-bold text-indigo-600 dark:text-indigo-400">+ Thêm phân loại mới...</option>`;
      if (curVal && curVal !== '__add_new__' && projects.some(p => p.name === curVal)) {
        modalSelect.value = curVal;
      }
    }
  }

  function addNewProjectPrompt(defaultName = '') {
    const promptMsg = currentLang === 'vi' 
      ? 'Nhập tên Dự án / Phân loại mới theo nhu cầu của bạn (VD: Nghiên cứu AI, Việc gia đình, Freelance...):' 
      : 'Enter new Project / Category name according to your needs:';
    const name = prompt(promptMsg, defaultName);
    if (name && name.trim()) {
      const trimmed = name.trim();
      let existing = projects.find(p => p.name.toLowerCase() === trimmed.toLowerCase());
      if (!existing) {
        const colors = ['pink', 'sky', 'emerald', 'amber', 'purple', 'indigo', 'teal', 'rose'];
        const color = colors[projects.length % colors.length];
        existing = { id: 'proj-' + Date.now(), name: trimmed, color: color };
        projects.push(existing);
        saveProjects();
        showHint(currentLang === 'vi' ? `Đã thêm phân loại mới: "${trimmed}"` : `Added category: "${trimmed}"`);
      }
      populateProjectDropdowns();
      const modalSelect = document.getElementById('task-detail-project');
      if (modalSelect) modalSelect.value = existing.name;
      return existing.name;
    } else {
      const modalSelect = document.getElementById('task-detail-project');
      if (modalSelect && modalSelect.value === '__add_new__') {
        modalSelect.value = projects[0]?.name || '';
      }
      return null;
    }
  }

  // ==================== MODAL TASK DETAIL (ADD / EDIT TASK) ====================
  const modalTaskDetail     = document.getElementById('modal-task-detail');
  const btnCloseTaskDetail  = document.getElementById('btn-close-task-detail-modal');
  const btnCancelTaskDetail = document.getElementById('btn-cancel-task-detail');
  const formTaskDetail      = document.getElementById('form-task-detail');
  const headingTaskDetail   = document.getElementById('modal-task-detail-heading');
  const inputTaskId         = document.getElementById('task-detail-id');
  const inputTaskTitle      = document.getElementById('task-detail-title');
  const inputTaskProject    = document.getElementById('task-detail-project');
  const inputTaskPriority   = document.getElementById('task-detail-priority');
  const inputTaskStatus     = document.getElementById('task-detail-status');
  const inputTaskDeadline   = document.getElementById('task-detail-deadline');
  const inputTaskHour       = document.getElementById('task-detail-hour');
  const inputTaskDesc       = document.getElementById('task-detail-desc');
  const subtasksListEl      = document.getElementById('task-subtasks-list');
  const inputNewSubtask     = document.getElementById('input-new-subtask');
  const btnAddSubtaskItem   = document.getElementById('btn-add-subtask-item');
  const btnDeleteTaskModal  = document.getElementById('btn-delete-task-in-modal');

  let currentSubtasksDraft = [];

  function openTaskDetailModal(task = null, defaults = {}) {
    populateProjectDropdowns();
    if (task) {
      if (headingTaskDetail) headingTaskDetail.textContent = currentLang === 'vi' ? 'Chỉnh Sửa Nhiệm Vụ' : 'Edit Task';
      if (inputTaskId) inputTaskId.value = task.id;
      if (inputTaskTitle) inputTaskTitle.value = task.title;
      if (inputTaskProject) inputTaskProject.value = task.project;
      if (inputTaskPriority) inputTaskPriority.value = task.priority;
      if (inputTaskStatus) inputTaskStatus.value = task.status;
      if (inputTaskDeadline) inputTaskDeadline.value = task.deadline || '';
      if (inputTaskHour) inputTaskHour.value = (task.scheduleHour !== undefined && task.scheduleHour !== null) ? String(task.scheduleHour) : 'allday';
      if (inputTaskDesc) inputTaskDesc.value = task.description || '';
      currentSubtasksDraft = JSON.parse(JSON.stringify(task.subtasks || []));
      btnDeleteTaskModal?.classList.remove('hidden');
    } else {
      if (headingTaskDetail) headingTaskDetail.textContent = currentLang === 'vi' ? 'Tạo Nhiệm Vụ / Lịch Mới' : 'Create Task / Event';
      if (inputTaskId) inputTaskId.value = '';
      if (inputTaskTitle) inputTaskTitle.value = '';
      if (inputTaskProject) inputTaskProject.value = projects[0]?.name || '';
      if (inputTaskPriority) inputTaskPriority.value = 'medium';
      if (inputTaskStatus) inputTaskStatus.value = defaults.status || 'todo';
      const now = new Date();
      const localNowStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}T${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
      if (inputTaskDeadline) inputTaskDeadline.value = defaults.deadline || localNowStr;
      if (inputTaskHour) inputTaskHour.value = (defaults.scheduleHour !== undefined && defaults.scheduleHour !== null) ? String(defaults.scheduleHour) : 'allday';
      if (inputTaskDesc) inputTaskDesc.value = '';
      currentSubtasksDraft = [];
      btnDeleteTaskModal?.classList.add('hidden');
    }

    renderSubtasksDraft();
    modalTaskDetail?.classList.remove('hidden');
  }

  inputTaskDeadline?.addEventListener('change', () => {
    if (inputTaskDeadline.value && inputTaskHour) {
      const td = new Date(inputTaskDeadline.value);
      if (!isNaN(td.getTime())) {
        inputTaskHour.value = String(td.getHours());
      }
    }
  });

  function closeTaskDetailModal() { modalTaskDetail?.classList.add('hidden'); }
  btnCloseTaskDetail?.addEventListener('click', closeTaskDetailModal);
  btnCancelTaskDetail?.addEventListener('click', closeTaskDetailModal);
  document.getElementById('btn-open-add-task-modal')?.addEventListener('click', () => openTaskDetailModal());

  inputTaskProject?.addEventListener('change', () => {
    if (inputTaskProject.value === '__add_new__') {
      addNewProjectPrompt();
    }
  });

  document.getElementById('btn-add-custom-project')?.addEventListener('click', () => {
    addNewProjectPrompt();
  });

  function renderSubtasksDraft() {
    if (!subtasksListEl) return;
    subtasksListEl.innerHTML = '';
    currentSubtasksDraft.forEach((s, idx) => {
      const li = document.createElement('div');
      li.className = 'flex items-center justify-between p-2 bg-slate-50 rounded-lg text-xs subtask-item';
      li.innerHTML = `
        <div class="flex items-center gap-2 flex-1">
          <input type="checkbox" ${s.completed ? 'checked' : ''} data-idx="${idx}" class="subtask-draft-cb w-3.5 h-3.5 rounded text-indigo-600 cursor-pointer">
          <span class="${s.completed ? 'line-through text-slate-400' : 'text-slate-800'}">${s.text}</span>
        </div>
        <button type="button" data-idx="${idx}" class="subtask-del-btn text-slate-400 hover:text-rose-500 opacity-60 hover:opacity-100 p-1">
          <i class="fa-solid fa-xmark"></i>
        </button>
      `;
      subtasksListEl.appendChild(li);
    });

    document.querySelectorAll('.subtask-draft-cb').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const idx = Number(e.target.dataset.idx);
        if (currentSubtasksDraft[idx]) currentSubtasksDraft[idx].completed = e.target.checked;
      });
    });
    document.querySelectorAll('.subtask-del-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.idx);
        currentSubtasksDraft.splice(idx, 1);
        renderSubtasksDraft();
      });
    });
  }

  btnAddSubtaskItem?.addEventListener('click', () => {
    const txt = inputNewSubtask?.value.trim();
    if (!txt) return;
    currentSubtasksDraft.push({ id: Date.now(), text: txt, completed: false });
    inputNewSubtask.value = '';
    renderSubtasksDraft();
  });

  formTaskDetail?.addEventListener('submit', (e) => {
    e.preventDefault();
    const idVal = inputTaskId?.value;
    const titleVal = inputTaskTitle?.value.trim();
    if (!titleVal) return;

    const projVal = inputTaskProject?.value || projects[0]?.name;
    const statusVal = inputTaskStatus?.value || 'todo';
    const dlVal = inputTaskDeadline?.value || '';
    const hourSelectVal = inputTaskHour?.value || 'allday';
    const dayVal = dlVal ? new Date(dlVal).getDay() : 1;
    const hourVal = hourSelectVal === 'allday' ? 'allday' : Number(hourSelectVal);

    if (idVal) {
      const id = Number(idVal);
      const t = tasks.find(x => x.id === id);
      if (t) {
        t.title = titleVal;
        t.project = projVal;
        t.priority = inputTaskPriority?.value || 'medium';
        t.status = statusVal;
        t.completed = (statusVal === 'done');
        t.deadline = dlVal;
        t.scheduleDay = dayVal;
        t.scheduleHour = hourVal;
        t.pillColor = getPillColorFromProject(projVal);
        t.accentColor = getAccentColorFromProject(projVal);
        t.description = inputTaskDesc?.value.trim() || '';
        t.subtasks = currentSubtasksDraft;
      }
    } else {
      const newTask = {
        id: Date.now(),
        title: titleVal,
        project: projVal,
        priority: inputTaskPriority?.value || 'medium',
        status: statusVal,
        completed: (statusVal === 'done'),
        deadline: dlVal,
        scheduleDay: dayVal,
        scheduleHour: hourVal,
        pillColor: getPillColorFromProject(projVal),
        accentColor: getAccentColorFromProject(projVal),
        description: inputTaskDesc?.value.trim() || '',
        subtasks: currentSubtasksDraft
      };
      tasks.unshift(newTask);
    }

    saveTasks();
    closeTaskDetailModal();
  });

  btnDeleteTaskModal?.addEventListener('click', () => {
    const idVal = inputTaskId?.value;
    if (!idVal) return;
    if (confirm(currentLang === 'vi' ? 'Bạn có chắc chắn muốn xóa công việc này?' : 'Delete this task?')) {
      tasks = tasks.filter(t => t.id !== Number(idVal));
      saveTasks();
      closeTaskDetailModal();
    }
  });

  // ==================== SETTINGS VIEW LOGIC & PIN ====================
  function renderSettingsView() {
    const pinDisplay = document.getElementById('setting-display-pin');
    if (pinDisplay) pinDisplay.textContent = financePin;

    const cardVi = document.getElementById('lang-opt-vi');
    const cardEn = document.getElementById('lang-opt-en');
    cardVi?.classList.toggle('active', currentLang === 'vi');
    cardEn?.classList.toggle('active', currentLang === 'en');

    // Theme active states
    const curTheme = localStorage.getItem('mylife_theme') || 'light';
    ['light', 'dark', 'system'].forEach(th => {
      const card = document.getElementById(`theme-opt-${th}`);
      card?.classList.toggle('active', curTheme === th);
    });
  }

  // ==================== THEME MANAGEMENT (LIGHT / DARK / SYSTEM) ====================
  let currentTheme = localStorage.getItem('mylife_theme') || 'light';

  function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('mylife_theme', theme);

    let isDark = false;
    if (theme === 'dark') {
      isDark = true;
    } else if (theme === 'system') {
      isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      isDark = false;
    }

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const iconEl = document.getElementById('header-theme-icon');
    if (iconEl) {
      iconEl.className = isDark ? 'fa-solid fa-sun text-sm text-amber-400' : 'fa-solid fa-moon text-sm text-slate-600';
    }

    renderSettingsView();
  }

  // Header quick theme toggle
  document.getElementById('btn-header-theme-toggle')?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark');
  });

  // Settings theme cards
  document.getElementById('theme-opt-light')?.addEventListener('click', () => applyTheme('light'));
  document.getElementById('theme-opt-dark')?.addEventListener('click', () => applyTheme('dark'));
  document.getElementById('theme-opt-system')?.addEventListener('click', () => applyTheme('system'));

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (currentTheme === 'system') applyTheme('system');
    });
  }
  applyTheme(currentTheme);

  document.getElementById('btn-save-new-pin')?.addEventListener('click', () => {
    const inputPin = document.getElementById('input-new-pin');
    const newPin = inputPin?.value.trim();
    if (!newPin || newPin.length < 4) {
      alert(currentLang === 'vi' ? 'Vui lòng nhập mã PIN từ 4 đến 6 ký tự!' : 'Please enter a PIN with 4 to 6 characters!');
      return;
    }
    financePin = newPin;
    localStorage.setItem(getAccountDataKey('finance_pin'), newPin);
    if (activeAccountId === 'acc-1') {
      localStorage.setItem(FINANCE_PW_KEY, newPin);
      localStorage.setItem('mylife_finance_pin', newPin);
    }

    // Tự động khóa lại phân hệ tài chính ngay sau khi đổi mật khẩu
    financeUnlocked = false;
    sessionStorage.removeItem(FINANCE_SESSION);
    applyLockState();

    renderSettingsView();
    if (inputPin) inputPin.value = '';

    alert(currentLang === 'vi' 
      ? `Đã cập nhật mật khẩu thành công! Phân hệ tài chính đã được khóa lại để bảo mật. Bạn cần nhập mật khẩu mới (${newPin}) để mở khóa khi vào quản lý tài chính.` 
      : `Password changed successfully! The finance module is now locked for security. You must enter your new password (${newPin}) to unlock when accessing finance.`);
  });

  // ==================== TASK SETTINGS & COUNTDOWN TIMER ====================
  const modalTaskSettings    = document.getElementById('modal-task-settings');
  const btnOpenTaskSettings  = document.getElementById('btn-open-task-settings');
  const btnCloseTaskSettings = document.getElementById('btn-close-task-settings');
  const btnCancelTaskSettings = document.getElementById('btn-cancel-task-settings');
  const formTaskSettings     = document.getElementById('form-task-settings');
  const settingCutoff        = document.getElementById('setting-task-cutoff');
  const settingTarget        = document.getElementById('setting-task-target');

  btnOpenTaskSettings?.addEventListener('click', () => {
    if (settingCutoff) {
      const hStr = String(taskSettings.cutoffHour || 22).padStart(2,'0');
      const mStr = String(taskSettings.cutoffMinute || 0).padStart(2,'0');
      settingCutoff.value = `${hStr}:${mStr}`;
    }
    if (settingTarget) settingTarget.value = taskSettings.dailyTarget || 5;
    modalTaskSettings?.classList.remove('hidden');
  });

  document.getElementById('btn-quick-config-deadline')?.addEventListener('click', () => btnOpenTaskSettings?.click());
  btnCloseTaskSettings?.addEventListener('click', () => modalTaskSettings?.classList.add('hidden'));
  btnCancelTaskSettings?.addEventListener('click', () => modalTaskSettings?.classList.add('hidden'));

  formTaskSettings?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (settingCutoff && settingCutoff.value) {
      const [h, m] = settingCutoff.value.split(':').map(Number);
      taskSettings.cutoffHour = isNaN(h) ? 22 : h;
      taskSettings.cutoffMinute = isNaN(m) ? 0 : m;
    }
    if (settingTarget) taskSettings.dailyTarget = Number(settingTarget.value) || 5;
    saveTaskSettings();
    modalTaskSettings?.classList.add('hidden');
  });

  const countdownTimerEl = document.getElementById('countdown-timer');
  const dailyDeadlineLabel = document.getElementById('daily-deadline-label');

  function updateCountdownTimer() {
    const now = new Date();
    const cutoff = new Date();
    cutoff.setHours(taskSettings.cutoffHour || 22, taskSettings.cutoffMinute || 0, 0, 0);

    if (dailyDeadlineLabel) {
      const hStr = String(taskSettings.cutoffHour || 22).padStart(2,'0');
      const mStr = String(taskSettings.cutoffMinute || 0).padStart(2,'0');
      dailyDeadlineLabel.textContent = currentLang === 'vi' 
        ? `Đóng sổ công việc trước ${hStr}:${mStr}`
        : `Daily target cutoff before ${hStr}:${mStr}`;
    }

    let diff = cutoff - now;
    if (diff <= 0) {
      if (countdownTimerEl) {
        countdownTimerEl.textContent = '00:00:00';
        countdownTimerEl.className = 'font-mono text-lg font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-300';
      }
      return;
    }

    const hrs = Math.floor(diff / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    if (countdownTimerEl) {
      countdownTimerEl.textContent = `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
      countdownTimerEl.className = 'font-mono text-lg font-black text-amber-950 tracking-wider bg-white/80 px-2.5 py-1 rounded-lg border border-amber-300 shadow-inner';
    }
  }
  setInterval(updateCountdownTimer, 1000);
  updateCountdownTimer();

  document.getElementById('btn-tasks-back-to-overview')?.addEventListener('click', () => switchMainView('overview'));
  document.getElementById('btn-goto-tasks')?.addEventListener('click', () => switchMainView('tasks'));


/* ============================================================
   * 14. HEALTH & WELLNESS TRACKING (SỨC KHỎE, NƯỚC UỐNG & GIẤC NGỦ)
   * ============================================================ */
  const DEFAULT_HEALTH_DATA = {
    steps: 8432,
    stepsTarget: 10000,
    waterIntakeMl: 1750,
    waterTargetMl: 2000,
    waterReminderEnabled: true,
    waterReminderIntervalMins: 60,
    lastWaterTime: Date.now() - 25 * 60 * 1000, // 25 mins ago
    sleepHours: 7.5,
    sleepTargetHours: 8.0,
    bedtime: '22:30',
    wakeTime: '06:00',
    sleepQualityScore: 92,
    sleepReminderEnabled: true,
    weeklyHistory: []
  };

  const nowForHealth = new Date();
  const todayIsoStr = `${nowForHealth.getFullYear()}-${String(nowForHealth.getMonth()+1).padStart(2,'0')}-${String(nowForHealth.getDate()).padStart(2,'0')}`;

  healthData = JSON.parse(localStorage.getItem(getAccountDataKey('health_data'))) || (activeAccountId === 'acc-1' ? (JSON.parse(localStorage.getItem('mylife_health_data')) || DEFAULT_HEALTH_DATA) : getInitialHealthDataForAccount(activeAccountId));

  // DỌN DẸP DỮ LIỆU FAKE CŨ (theo yêu cầu: ngày nào không có dữ liệu thì để trống, không tự ý điền vào)
  const fakeStepValues = [9200, 10500, 8100, 11200, 9800, 12400, 8432];
  if (healthData.dailyLogs) {
    Object.keys(healthData.dailyLogs).forEach(k => {
      if (fakeStepValues.includes(healthData.dailyLogs[k]?.steps)) {
        delete healthData.dailyLogs[k];
      }
    });
  } else {
    healthData.dailyLogs = {};
  }

  // ĐỒNG BỘ VÀ LƯU TRỮ THEO NGÀY (DAY ROLLOVER & PERSISTENCE CHÍNH XÁC):
  // 1. Khi sang ngày mới (hôm nay khác với lastActiveDate):
  //    - Toàn bộ dữ liệu của ngày hôm qua được lưu vĩnh viễn trong healthData.dailyLogs[lastActiveDate].
  //    - Bộ đếm ngày mới (bước chân, nước uống) tự động bắt đầu lại từ 0.
  // 2. Trong ngày hôm nay:
  //    - Đồng bộ dữ liệu thực tế vào healthData.dailyLogs[todayIsoStr] để biểu đồ và thẻ KPI khớp 100%.
  if (healthData.lastActiveDate && healthData.lastActiveDate !== todayIsoStr) {
    const prevDate = healthData.lastActiveDate;
    if (!healthData.dailyLogs[prevDate]) {
      healthData.dailyLogs[prevDate] = {
        steps: typeof healthData.steps === 'number' && healthData.steps > 0 ? healthData.steps : null,
        calories: healthData.steps ? Math.round(healthData.steps * 0.04) : null,
        water: typeof healthData.waterIntakeMl === 'number' && healthData.waterIntakeMl > 0 ? healthData.waterIntakeMl : null,
        sleep: typeof healthData.sleepHours === 'number' && healthData.sleepHours > 0 ? healthData.sleepHours : null,
        bedtime: healthData.bedtime || null,
        wakeTime: healthData.wakeTime || null
      };
    }
    // Bắt đầu ngày mới: reset chỉ số trong ngày
    healthData.steps = 0;
    healthData.waterIntakeMl = 0;
    healthData.lastActiveDate = todayIsoStr;
    localStorage.setItem(getAccountDataKey('health_data'), JSON.stringify(healthData));
    if (activeAccountId === 'acc-1') {
      localStorage.setItem('mylife_health_data', JSON.stringify(healthData));
      localStorage.setItem('mylife_steps', 0);
    }
  } else {
    // Trong cùng ngày: đảm bảo lưu log hôm nay
    if (!healthData.dailyLogs[todayIsoStr]) {
      healthData.dailyLogs[todayIsoStr] = {
        steps: typeof healthData.steps === 'number' && healthData.steps > 0 ? healthData.steps : null,
        calories: typeof healthData.steps === 'number' && healthData.steps > 0 ? Math.round(healthData.steps * 0.04) : null,
        water: typeof healthData.waterIntakeMl === 'number' && healthData.waterIntakeMl > 0 ? healthData.waterIntakeMl : null,
        sleep: typeof healthData.sleepHours === 'number' && healthData.sleepHours > 0 ? healthData.sleepHours : null,
        bedtime: healthData.bedtime || '23:00',
        wakeTime: healthData.wakeTime || '06:30'
      };
    }
    healthData.lastActiveDate = todayIsoStr;
  }

  let activityWeeklyChartInstance = null;
  let sleepWeeklyChartInstance = null;
  let currentHealthLogMode = 'all'; // 'all' | 'steps' | 'water' | 'sleep'

  function saveHealthData() {
    localStorage.setItem(getAccountDataKey('health_data'), JSON.stringify(healthData));
    if (activeAccountId === 'acc-1') {
      localStorage.setItem('mylife_health_data', JSON.stringify(healthData));
      localStorage.setItem('mylife_steps', healthData.steps);
    }
    const curAcc = savedAccounts.find(a => a.id === activeAccountId);
    const targetId = curAcc?.uid || curAcc?.id || activeAccountId;
    if (window.MyLifeFirebase?.isAvailable() && targetId) {
      window.MyLifeFirebase.syncModuleToCloud(targetId, 'health', healthData);
    }
    renderHealthOverviewCard();
    renderHealthView();
    if (typeof renderSmartNotifications === 'function') renderSmartNotifications();
  }

  function calcCalories(st) {
    return Math.round(st * 0.04);
  }

  // --- Render Health Card on Overview View ---
  function renderHealthOverviewCard() {
    const isEn = (currentLang === 'en');
    const nf = new Intl.NumberFormat(isEn ? 'en-US' : 'vi-VN');
    const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };

    // Steps & Calories
    const stepsPct = Math.min(100, Math.round((healthData.steps / healthData.stepsTarget) * 1000) / 10);
    const calories = calcCalories(healthData.steps);
    setTxt('ov-health-steps', nf.format(healthData.steps));
    setTxt('ov-health-steps-target', `/ ${nf.format(healthData.stepsTarget)} ${isEn ? 'steps' : 'bước'}`);
    setTxt('ov-health-calories', `${nf.format(calories)} kcal`);
    setTxt('ov-health-steps-pct', `${Math.round(stepsPct)}%`);

    const remainSteps = Math.max(0, healthData.stepsTarget - healthData.steps);
    setTxt('ov-health-steps-remain', remainSteps > 0 
      ? (isEn ? `${nf.format(remainSteps)} steps left` : `Còn ${nf.format(remainSteps)} bước nữa`)
      : (isEn ? '🎉 Goal achieved!' : '🎉 Đã đạt mục tiêu!'));

    const stepsBar = document.getElementById('ov-health-steps-bar');
    if (stepsBar) stepsBar.style.width = `${stepsPct}%`;

    // Water (Format as 1.8 / 2.0L or ml)
    const waterL = (healthData.waterIntakeMl / 1000).toFixed(1);
    const targetL = (healthData.waterTargetMl / 1000).toFixed(1);
    setTxt('ov-health-water-ml', `${waterL} / ${targetL}L`);

    // Sleep (Format as 7h 30m or 0h 00m)
    if (typeof healthData.sleepHours === 'number' && healthData.sleepHours > 0) {
      const sleepHrs = Math.floor(healthData.sleepHours);
      const sleepMins = Math.round((healthData.sleepHours % 1) * 60);
      setTxt('ov-health-sleep-hours', `${sleepHrs}h ${sleepMins > 0 ? sleepMins + 'm' : '00m'}`);
    } else {
      setTxt('ov-health-sleep-hours', '0h 00m');
    }
  }

  // --- Render Full Dedicated Health View (Bento Blocks Hub) ---
  function renderHealthView() {
    const isEn = (currentLang === 'en');
    const nf = new Intl.NumberFormat(isEn ? 'en-US' : 'vi-VN');
    const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };

    // KPI 1: Steps (Emerald Block)
    const stepsPct = Math.min(100, Math.round((healthData.steps / healthData.stepsTarget) * 1000) / 10);
    setTxt('health-kpi-steps', nf.format(healthData.steps));
    setTxt('health-kpi-steps-target', `/ ${nf.format(healthData.stepsTarget)} ${isEn ? 'steps' : 'bước'}`);
    const stepsRemain = Math.max(0, healthData.stepsTarget - healthData.steps);
    setTxt('health-kpi-steps-remain', stepsRemain > 0 
      ? (isEn ? `${stepsPct}% met` : `${stepsPct}% đạt`)
      : (isEn ? '🎉 Goal reached!' : '🎉 Đạt mục tiêu!'));
    setTxt('health-steps-distance', `${(healthData.steps * 0.0007).toFixed(1)} km`);
    const kpiStepsBar = document.getElementById('health-kpi-steps-bar');
    if (kpiStepsBar) kpiStepsBar.style.width = `${stepsPct}%`;

    // KPI 2: Calories (Amber / Coral Block)
    const cals = calcCalories(healthData.steps);
    setTxt('health-kpi-calories', nf.format(cals));
    const calPct = Math.min(100, Math.round((cals / 500) * 100));
    setTxt('health-kpi-cal-pct', `${calPct}% ${isEn ? 'of goal' : 'mục tiêu'}`);
    setTxt('health-cal-walking', `${Math.round(cals * 0.7)} kcal ${isEn ? 'walking' : 'đi bộ'}`);
    const kpiCalBar = document.getElementById('health-kpi-calories-bar');
    if (kpiCalBar) kpiCalBar.style.width = `${calPct}%`;

    // KPI 3: Water (Electric Sky Blue Block)
    const waterPct = Math.min(100, Math.round((healthData.waterIntakeMl / healthData.waterTargetMl) * 100));
    const cups = Math.floor(healthData.waterIntakeMl / 250);
    const targetCups = Math.ceil(healthData.waterTargetMl / 250);
    setTxt('health-kpi-water', nf.format(healthData.waterIntakeMl));
    setTxt('health-kpi-water-target', `/ ${nf.format(healthData.waterTargetMl)} ml`);
    setTxt('health-kpi-water-cups', isEn ? `${cups}/${targetCups} Cups` : `${cups}/${targetCups} Ly`);
    const kpiWaterBar = document.getElementById('health-kpi-water-bar');
    if (kpiWaterBar) kpiWaterBar.style.width = `${waterPct}%`;

    const intervalMs = (healthData.waterReminderIntervalMins || 60) * 60 * 1000;
    const elapsed = Date.now() - (healthData.lastWaterTime || Date.now());
    const remainMs = Math.max(0, intervalMs - elapsed);
    const remainMins = Math.ceil(remainMs / 60000);
    setTxt('health-water-quick-rem', healthData.waterReminderEnabled 
      ? (isEn ? `Remind: ${remainMins}m` : `Nhắc: ${remainMins}p`) 
      : (isEn ? 'Remind: Off' : 'Nhắc: Tắt'));

    // KPI 4: Sleep (Deep Indigo / Violet Block)
    const hasSleep = typeof healthData.sleepHours === 'number' && healthData.sleepHours > 0;
    if (hasSleep) {
      const sleepHrs = Math.floor(healthData.sleepHours);
      const sleepMins = Math.round((healthData.sleepHours % 1) * 60);
      setTxt('health-kpi-sleep', `${sleepHrs}h ${sleepMins > 0 ? sleepMins + 'm' : '00m'}`);
      setTxt('health-kpi-sleep-score', `${healthData.sleepQualityScore || 0}đ • ${isEn ? 'Recorded' : 'Sâu'}`);
      setTxt('health-sleep-bed-tile', `${healthData.bedtime || '--:--'} ${isEn ? 'sleep' : 'ngủ'}`);
      setTxt('health-sleep-wake-tile', `${healthData.wakeTime || '--:--'} ${isEn ? 'wake' : 'dậy'}`);
      const kpiSleepBar = document.getElementById('health-kpi-sleep-bar');
      if (kpiSleepBar) kpiSleepBar.style.width = `${Math.min(100, (healthData.sleepHours / healthData.sleepTargetHours) * 100)}%`;
    } else {
      setTxt('health-kpi-sleep', '0h 00m');
      setTxt('health-kpi-sleep-score', isEn ? '0 pts • Unrecorded' : '0đ • Chưa ghi nhận');
      setTxt('health-sleep-bed-tile', isEn ? '--:-- sleep' : '--:-- ngủ');
      setTxt('health-sleep-wake-tile', isEn ? '--:-- wake' : '--:-- dậy');
      const kpiSleepBar = document.getElementById('health-kpi-sleep-bar');
      if (kpiSleepBar) kpiSleepBar.style.width = '0%';
    }

    // Render 8 Interactive Water Cups
    renderWaterCupsGrid();

    // Render Water Reminder Countdown
    updateWaterReminderCountdown();

    // Circadian Sleep details & Đánh giá chất lượng tiêu chuẩn 90 phút
    renderSleepQualityAndCycles();

    const toggleSleepRem = document.getElementById('toggle-sleep-reminder');
    if (toggleSleepRem) toggleSleepRem.checked = healthData.sleepReminderEnabled;

    const toggleWaterRem = document.getElementById('toggle-water-reminder');
    if (toggleWaterRem) toggleWaterRem.checked = healthData.waterReminderEnabled;

    // Render 2 Chart.js Weekly Graphs (Vận Động & Giấc Ngủ tách biệt trực quan)
    renderActivityWeeklyChart();
    renderSleepWeeklyChart();
  }

  // --- Render 8 Interactive Water Cups (Neon Graphical Tiles) ---
  function renderWaterCupsGrid() {
    const grid = document.getElementById('water-cups-grid');
    if (!grid) return;
    const isEn = (currentLang === 'en');
    const totalCups = 8;
    grid.innerHTML = '';

    for (let i = 1; i <= totalCups; i++) {
      const isFilled = (i * 250 <= healthData.waterIntakeMl);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `neon-cup-tile ${isFilled ? 'active' : 'text-slate-400'}`;
      btn.title = isFilled 
        ? (isEn ? `Cup ${i} (250ml) - Click to unmark` : `Ly ${i} (250ml) - Bấm để bỏ chọn`)
        : (isEn ? `Cup ${i} (250ml) - Click to drink` : `Ly ${i} (250ml) - Bấm để ghi nhận uống`);
      btn.innerHTML = `
        <i class="fa-solid fa-glass-water text-base mb-1 ${isFilled ? 'text-white' : 'text-sky-300/70'}"></i>
        <span class="text-[10px] font-extrabold">${isEn ? 'Cup' : 'Ly'} ${i}</span>
        <span class="text-[9px] ${isFilled ? 'text-white/80' : 'text-slate-400'}">250ml</span>
      `;
      btn.addEventListener('click', () => {
        if (isFilled && i * 250 === healthData.waterIntakeMl) {
          healthData.waterIntakeMl = (i - 1) * 250;
        } else {
          healthData.waterIntakeMl = i * 250;
          healthData.lastWaterTime = Date.now();
        }
        saveHealthData();
        showHint(isEn ? `💧 Water updated: ${healthData.waterIntakeMl} ml!` : `💧 Đã cập nhật lượng nước: ${healthData.waterIntakeMl} ml!`);
      });
      grid.appendChild(btn);
    }
  }

  // --- Water Reminder Countdown ---
  function updateWaterReminderCountdown() {
    const timerTxtEl = document.getElementById('water-next-reminder-text');
    if (!timerTxtEl) return;
    const isEn = (currentLang === 'en');
    if (!healthData.waterReminderEnabled) {
      timerTxtEl.textContent = isEn ? 'Reminders paused' : 'Nhắc nhở đang tắt';
      return;
    }

    const intervalMs = (healthData.waterReminderIntervalMins || 60) * 60 * 1000;
    const elapsed = Date.now() - (healthData.lastWaterTime || Date.now());
    const remainMs = intervalMs - elapsed;

    if (remainMs <= 0) {
      timerTxtEl.innerHTML = `<span class="text-rose-600 font-bold animate-pulse">${isEn ? 'Time to drink water now!' : 'Đã đến giờ uống nước!'}</span>`;
    } else {
      const remainMins = Math.ceil(remainMs / 60000);
      timerTxtEl.textContent = isEn ? `In about ${remainMins} minutes` : `Còn khoảng ${remainMins} phút nữa`;
    }
  }

  // Check water reminder periodically (every 60s)
  setInterval(() => {
    updateWaterReminderCountdown();
    if (!healthData.waterReminderEnabled) return;
    const intervalMs = (healthData.waterReminderIntervalMins || 60) * 60 * 1000;
    const elapsed = Date.now() - (healthData.lastWaterTime || Date.now());
    if (elapsed >= intervalMs && elapsed < intervalMs + 65000) {
      showHint(currentLang === 'en'
        ? '💧 Hydration reminder: Drink a fresh cup of water (250ml) to stay energized!'
        : '💧 Nhắc nhở uống nước: Đã đến giờ uống thêm 1 cốc nước (250ml) để giữ cơ thể tràn đầy năng lượng!');
    }
  }, 60000);

  // --- Đánh giá chất lượng giấc ngủ theo chuẩn khoa học (Chu kỳ 90 phút) ---
  function evaluateSleepQuality(sleepHours) {
    if (sleepHours === null || sleepHours === undefined || sleepHours <= 0) {
      return {
        status: 'unrecorded',
        title: currentLang === 'en' ? 'No sleep data' : 'Chưa có dữ liệu giấc ngủ',
        badgeText: currentLang === 'en' ? '0 pts • No data' : '0đ • Chưa ghi nhận',
        badgeClass: 'bg-slate-500/20 text-slate-300 border border-slate-500/30',
        score: 0,
        cycles: 0,
        advice: currentLang === 'en'
          ? 'Enter your bedtime and waketime to analyze standard sleep quality.'
          : 'Tự điền giờ đi ngủ và thức dậy để theo dõi chu kỳ 90 phút & đánh giá chất lượng giấc ngủ tiêu chuẩn.'
      };
    }

    const cycles = Math.round((sleepHours / 1.5) * 10) / 10;
    const fullCycles = Math.floor(sleepHours / 1.5);

    if (sleepHours >= 7.0 && sleepHours <= 9.0) {
      const score = Math.min(100, Math.round(85 + (sleepHours - 7) * 7.5));
      return {
        status: 'optimal',
        title: currentLang === 'en' ? 'Optimal Sleep (Standard)' : 'Đạt chuẩn khoa học (Tối ưu)',
        badgeText: `${score}đ • ${currentLang === 'en' ? 'Deep Sleep' : 'Sâu'}`,
        badgeClass: 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/40',
        score: score,
        cycles: cycles,
        fullCycles: fullCycles,
        advice: currentLang === 'en'
          ? `Excellent! ${sleepHours}h completed ${fullCycles} full 90-min cycles, optimizing cellular recovery and memory consolidation.`
          : `Tuyệt vời! ${sleepHours}h đạt ${fullCycles} chu kỳ 90 phút trọn vẹn, giúp não bộ phục hồi tế bào và tăng cường trí nhớ tối đa.`
      };
    } else if (sleepHours >= 6.0 && sleepHours < 7.0) {
      return {
        status: 'fair',
        title: currentLang === 'en' ? 'Slightly Insufficient (Fair)' : 'Hơi thiếu ngủ (Tạm ổn)',
        badgeText: `72đ • ${currentLang === 'en' ? 'Fair' : 'Tạm ổn'}`,
        badgeClass: 'bg-amber-500/25 text-amber-300 border border-amber-400/40',
        score: 72,
        cycles: cycles,
        fullCycles: fullCycles,
        advice: currentLang === 'en'
          ? `${sleepHours}h reached ${fullCycles} cycles. Going to bed 30-45 mins earlier will complete 5 optimal cycles (7.5h).`
          : `${sleepHours}h đạt ${fullCycles} chu kỳ. Bạn nên đi ngủ sớm hơn 30-45 phút để hoàn thành đủ 5 chu kỳ chuẩn (7.5h).`
      };
    } else if (sleepHours < 6.0) {
      const score = Math.max(35, Math.round(sleepHours * 10));
      return {
        status: 'poor',
        title: currentLang === 'en' ? 'Severe Sleep Deprivation' : 'Thiếu ngủ nghiêm trọng (Báo động)',
        badgeText: `${score}đ • ${currentLang === 'en' ? 'Poor' : 'Thiếu ngủ'}`,
        badgeClass: 'bg-rose-500/25 text-rose-300 border border-rose-400/40',
        score: score,
        cycles: cycles,
        fullCycles: fullCycles,
        advice: currentLang === 'en'
          ? `Warning: Only ${sleepHours}h (${cycles} cycles). Deprivation reduces cognitive focus by 40% and elevates cortisol stress levels.`
          : `Cảnh báo: Chỉ ngủ ${sleepHours}h (${cycles} chu kỳ 90 phút). Thiếu ngủ làm giảm 40% khả năng tập trung và tăng hormone cortisol gây căng thẳng.`
      };
    } else {
      return {
        status: 'overslept',
        title: currentLang === 'en' ? 'Overslept' : 'Ngủ quá nhiều (Bội thực giấc ngủ)',
        badgeText: `75đ • ${currentLang === 'en' ? 'Overslept' : 'Dư thừa'}`,
        badgeClass: 'bg-purple-500/25 text-purple-300 border border-purple-400/40',
        score: 75,
        cycles: cycles,
        fullCycles: fullCycles,
        advice: currentLang === 'en'
          ? `Sleeping ${sleepHours}h may induce grogginess by disrupting natural circadian rhythms.`
          : `Ngủ ${sleepHours}h có thể khiến cơ thể mệt mỏi và uể oải do phá vỡ nhịp sinh học tự nhiên.`
      };
    }
  }

  // --- Cập nhật chu kỳ giấc ngủ & đánh giá tiêu chuẩn trong Card Bento 6 ---
  function renderSleepQualityAndCycles() {
    const isEn = (currentLang === 'en');
    const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };

    const hasSleep = typeof healthData.sleepHours === 'number' && healthData.sleepHours > 0;
    const durHrs = hasSleep ? healthData.sleepHours : 0;

    const evalRes = evaluateSleepQuality(hasSleep ? durHrs : 0);
    healthData.sleepQualityScore = evalRes.score;

    setTxt('sleep-target-bedtime', (hasSleep && healthData.bedtime) ? healthData.bedtime : '--:--');
    setTxt('sleep-target-waketime', (hasSleep && healthData.wakeTime) ? healthData.wakeTime : '--:--');

    // Cập nhật banner đánh giá chất lượng giấc ngủ trong Card Bento 6
    const titleEl = document.getElementById('sleep-card-quality-title');
    if (titleEl) {
      if (hasSleep) {
        const icon = evalRes.status === 'optimal' ? 'fa-circle-check text-emerald-400'
          : evalRes.status === 'fair' ? 'fa-triangle-exclamation text-amber-400'
          : evalRes.status === 'poor' ? 'fa-circle-xmark text-rose-400'
          : 'fa-cloud-moon text-purple-400';
        titleEl.innerHTML = `<i class="fa-solid ${icon}"></i> ${evalRes.title} (${durHrs}h)`;
      } else {
        titleEl.innerHTML = `<i class="fa-solid fa-moon text-slate-400"></i> ${isEn ? 'No sleep logged' : 'Chưa ghi nhận giấc ngủ'} (0h)`;
      }
    }

    const badgeEl = document.getElementById('sleep-card-quality-badge');
    if (badgeEl) {
      badgeEl.textContent = evalRes.badgeText;
      badgeEl.className = `px-2 py-0.5 rounded-full text-[10px] font-black ${evalRes.badgeClass}`;
    }

    const advEl = document.getElementById('sleep-card-quality-advice');
    if (advEl) advEl.textContent = evalRes.advice;

    // Render các khối chu kỳ 90 phút động
    const cyclesContainer = document.getElementById('sleep-cycles-container');
    if (cyclesContainer) {
      cyclesContainer.innerHTML = '';
      if (hasSleep) {
        const numCycles = Math.max(1, Math.min(8, Math.round(durHrs / 1.5)));
        for (let i = 1; i <= numCycles; i++) {
          const isLast = (i === numCycles);
          const cycleDiv = document.createElement('div');
          cycleDiv.className = `sleep-cycle-block ${isLast ? 'bg-indigo-500/30 border-indigo-400/50' : ''}`;
          cycleDiv.innerHTML = `
            <span class="text-[9px] ${isLast ? 'text-emerald-300' : 'text-indigo-300'} block font-bold">KỲ ${i} ${isLast && durHrs >= 7 && durHrs <= 9 ? '★' : ''}</span>
            <span class="text-xs font-black text-white">${isLast ? `${durHrs}h` : '90m'}</span>
          `;
          cyclesContainer.appendChild(cycleDiv);
        }
      } else {
        cyclesContainer.innerHTML = `<div class="col-span-full py-2 text-center text-xs text-slate-400 dark:text-slate-500">${isEn ? 'No sleep logged yet' : 'Chưa ghi nhận giấc ngủ'}</div>`;
      }
    }

    // Cập nhật card Hero KPI 4
    if (hasSleep) {
      const sleepHrs = Math.floor(durHrs);
      const sleepMins = Math.round((durHrs % 1) * 60);
      setTxt('health-kpi-sleep', `${sleepHrs}h ${sleepMins > 0 ? sleepMins + 'm' : '00m'}`);
      setTxt('health-kpi-sleep-score', `${evalRes.score}đ • ${evalRes.title.split(' ')[0]}`);
    } else {
      setTxt('health-kpi-sleep', '0h 00m');
      setTxt('health-kpi-sleep-score', isEn ? '0 pts • Unrecorded' : '0đ • Chưa ghi nhận');
    }

    // Cập nhật giờ nhắc nhở tắt màn hình
    if (hasSleep && healthData.bedtime) {
      const [bH, bM] = healthData.bedtime.split(':').map(Number);
      let remH = bH;
      let remM = (bM || 0) - 30;
      if (remM < 0) { remM += 60; remH = (remH - 1 + 24) % 24; }
      setTxt('sleep-reminder-time-label', `${String(remH).padStart(2,'0')}:${String(remM).padStart(2,'0')}`);
    } else {
      setTxt('sleep-reminder-time-label', '--:--');
    }
  }

  // --- Lấy dữ liệu sức khỏe 7 ngày theo từng ngày thực tế trong tuần (TUYỆT ĐỐI KHÔNG TỰ ĐIỀN DỮ LIỆU FAKE) ---
  function getWeeklyHealthHistory() {
    const now = new Date();
    // 0=Sun, 1=Mon, ..., 6=Sat -> chuyển về chuẩn Thứ 2: 0=T2, 1=T3, 2=T4, 3=T5, 4=T6, 5=T7, 6=CN
    const todayDayIndex = (now.getDay() + 6) % 7;

    // Tìm Thứ 2 đầu tuần hiện tại
    const monday = new Date(now);
    monday.setDate(now.getDate() - todayDayIndex);
    monday.setHours(0, 0, 0, 0);

    const weekLabelsVi = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    const weekLabelsEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    if (!healthData.dailyLogs) healthData.dailyLogs = {};
    const todayIso = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;

    // Nếu hôm nay có phát sinh số liệu, đồng bộ vào dailyLogs[todayIso]
    if (healthData.steps > 0 || healthData.waterIntakeMl > 0) {
      if (!healthData.dailyLogs[todayIso]) {
        healthData.dailyLogs[todayIso] = { steps: null, calories: null, water: null, sleep: null, bedtime: null, wakeTime: null };
      }
      if (healthData.steps > 0) {
        healthData.dailyLogs[todayIso].steps = healthData.steps;
        healthData.dailyLogs[todayIso].calories = calcCalories(healthData.steps);
      }
      if (healthData.waterIntakeMl > 0) {
        healthData.dailyLogs[todayIso].water = healthData.waterIntakeMl;
      }
    }

    const history = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dayIso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const dateShort = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
      const dayVi = weekLabelsVi[i];
      const dayEn = weekLabelsEn[i];

      let steps = null;
      let calories = null;
      let sleep = null;
      let isRecorded = false;

      // CHỈ LẤY KHI NGƯỜI DÙNG THỰC SỰ CÓ DỮ LIỆU ĐÃ GHI NHẬN CHO NGÀY NÀY
      if (healthData.dailyLogs[dayIso]) {
        const log = healthData.dailyLogs[dayIso];
        if (typeof log.steps === 'number' && log.steps > 0) {
          steps = log.steps;
          calories = log.calories !== undefined ? log.calories : calcCalories(steps);
          isRecorded = true;
        }
        if (typeof log.sleep === 'number' && log.sleep > 0) {
          sleep = log.sleep;
          isRecorded = true;
        }
      }

      history.push({
        day: dayVi,
        dayEn: dayEn,
        dateIso: dayIso,
        dateShort: dateShort,
        steps: steps,
        calories: calories,
        sleep: sleep,
        isRecorded: isRecorded,
        isToday: (i === todayDayIndex),
        isFuture: (i > todayDayIndex)
      });
    }

    return history;
  }

  // --- BIỂU ĐỒ 1: VẬN ĐỘNG 7 NGÀY (BƯỚC CHÂN & CALO) ---
  function renderActivityWeeklyChart() {
    const canvas = document.getElementById('chart-health-weekly');
    if (!canvas) return;
    const isEn = (currentLang === 'en');
    
    const history = getWeeklyHealthHistory();
    healthData.weeklyHistory = history;

    const labels = history.map(h => isEn ? h.dayEn : h.day);

    const isDark = document.documentElement.classList.contains('dark');
    const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
    const textColor = isDark ? '#94a3b8' : '#64748b';

    const stepData = history.map(h => h.steps);
    const calData = history.map(h => h.calories);

    // Chỉ tính toán cho các ngày thực sự có số liệu
    const activeDays = history.filter(h => typeof h.steps === 'number' && h.steps > 0);
    const validSteps = activeDays.map(h => h.steps);
    const validCals = activeDays.map(h => h.calories);

    const avgSteps = validSteps.length > 0 ? Math.round(validSteps.reduce((a, b) => a + b, 0) / validSteps.length) : 0;
    const totCals = validCals.reduce((a, b) => a + b, 0);
    const goalTarget = healthData.stepsTarget || 10000;
    const goalRate = validSteps.filter(s => s >= goalTarget).length;
    const recordedCount = activeDays.length;

    // Cập nhật 3 mini metric badges khớp 100%
    const b1 = document.getElementById('health-stat-avg-steps');
    const b2 = document.getElementById('health-stat-total-cals');
    const b3 = document.getElementById('health-stat-goal-rate');
    const nf = new Intl.NumberFormat(isEn ? 'en-US' : 'vi-VN');
    if (b1) b1.textContent = nf.format(avgSteps);
    if (b2) b2.textContent = `${nf.format(totCals)} kcal`;
    if (b3) b3.textContent = `${goalRate} / ${recordedCount} ${isEn ? 'days' : 'ngày'}`;

    document.querySelectorAll('#health-stat-badge-1 .badge-label-stat').forEach(el => el.textContent = isEn ? 'Avg:' : 'TB:');
    document.querySelectorAll('#health-stat-badge-2 .badge-label-stat').forEach(el => el.textContent = isEn ? 'Total:' : 'Tổng:');
    document.querySelectorAll('#health-stat-badge-3 .badge-label-stat').forEach(el => el.textContent = isEn ? 'Met:' : 'Đạt:');

    if (activityWeeklyChartInstance) activityWeeklyChartInstance.destroy();

    activityWeeklyChartInstance = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: isEn ? 'Steps' : 'Bước chân',
            data: stepData,
            backgroundColor: '#10b981',
            borderRadius: 8,
            yAxisID: 'y'
          },
          {
            label: isEn ? 'Calories (kcal)' : 'Calo (kcal)',
            data: calData,
            backgroundColor: '#f59e0b',
            borderRadius: 8,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        onClick: (event, elements) => {
          if (elements && elements.length > 0) {
            const elIndex = elements[0].index;
            const item = history[elIndex];
            if (item) openHealthLogModal(item.dateIso, 'steps');
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: textColor, font: { weight: '700' } } },
          y: {
            type: 'linear', display: true, position: 'left',
            grid: { color: gridColor },
            ticks: { color: textColor, callback: v => v >= 1000 ? `${v/1000}k` : v }
          },
          y1: {
            type: 'linear', display: false, position: 'right',
            grid: { drawOnChartArea: false }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: items => {
                if (!items.length) return '';
                const item = history[items[0].dataIndex];
                if (!item) return '';
                return `${isEn ? item.dayEn : item.day} (${item.dateShort})${item.isToday ? ' - Hôm nay' : ''}`;
              },
              label: ctx => {
                const val = ctx.parsed.y;
                if (val === null || val === undefined || isNaN(val)) {
                  return isEn ? ' ⏳ No data (Click to log steps)' : ' ⏳ Chưa có dữ liệu (Bấm để nhập bước chân)';
                }
                return ` ${ctx.dataset.label}: ${new Intl.NumberFormat().format(val)}`;
              }
            }
          }
        }
      }
    });
  }

  // --- BIỂU ĐỒ 2: GIẤC NGỦ 7 NGÀY & CHU KỲ 90 PHÚT (TRỰC QUAN 100%, KHÔNG TƯỜNG CHỮ) ---
  function renderSleepWeeklyChart() {
    const canvas = document.getElementById('chart-sleep-weekly');
    if (!canvas) return;
    const isEn = (currentLang === 'en');
    
    const history = getWeeklyHealthHistory();
    const labels = history.map(h => isEn ? h.dayEn : h.day);

    const isDark = document.documentElement.classList.contains('dark');
    const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
    const textColor = isDark ? '#94a3b8' : '#64748b';

    const sleepData = history.map(h => h.sleep);
    const activeSleepDays = history.filter(h => typeof h.sleep === 'number' && h.sleep > 0);
    const validSleeps = activeSleepDays.map(h => h.sleep);

    const avgSleep = validSleeps.length > 0 ? (validSleeps.reduce((a, b) => a + b, 0) / validSleeps.length).toFixed(1) : '0';

    const avgDurNum = Number(avgSleep);
    const evalOverall = evaluateSleepQuality(avgDurNum);

    // Cập nhật 3 badges trên Biểu đồ Giấc ngủ
    const b1 = document.getElementById('sleep-stat-avg-hours');
    const b2 = document.getElementById('sleep-stat-score');
    const b3 = document.getElementById('sleep-stat-quality-pill');
    if (b1) b1.textContent = `${avgSleep}h / ${isEn ? 'night' : 'đêm'}`;
    if (b2) b2.textContent = `${evalOverall.score}${isEn ? ' pts' : 'đ'}`;
    if (b3) {
      b3.textContent = evalOverall.badgeText;
      b3.className = `px-2 py-0.5 rounded-full text-[10px] font-black ${evalOverall.badgeClass}`;
    }

    document.querySelectorAll('#sleep-stat-badge-1 .badge-label-stat').forEach(el => el.textContent = isEn ? 'Avg:' : 'TB:');
    document.querySelectorAll('#sleep-stat-badge-2 .badge-label-stat').forEach(el => el.textContent = isEn ? 'Score:' : 'Điểm:');

    // Cập nhật giờ ngủ / dậy timeline
    const bedEl = document.getElementById('sleep-chart-bedtime');
    const wakeEl = document.getElementById('sleep-chart-waketime');
    const hasSleep = typeof healthData.sleepHours === 'number' && healthData.sleepHours > 0;
    if (bedEl) bedEl.textContent = (hasSleep && healthData.bedtime) ? healthData.bedtime : '--:--';
    if (wakeEl) wakeEl.textContent = (hasSleep && healthData.wakeTime) ? healthData.wakeTime : '--:--';

    // Cột màu trực quan theo chất lượng giấc ngủ
    const barColors = history.map(h => {
      if (!h.sleep) return 'transparent';
      if (h.sleep >= 7.0 && h.sleep <= 9.0) return '#10b981'; // Xanh lá: Đạt chuẩn 5-6 kỳ
      if (h.sleep >= 6.0 && h.sleep < 7.0) return '#f59e0b'; // Vàng cam: Hơi thiếu 4 kỳ
      if (h.sleep < 6.0) return '#f43f5e'; // Đỏ: Thiếu ngủ
      return '#a855f7'; // Tím: Ngủ quá nhiều
    });

    if (sleepWeeklyChartInstance) sleepWeeklyChartInstance.destroy();

    sleepWeeklyChartInstance = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: isEn ? 'Sleep Duration (hours)' : 'Thời lượng ngủ (giờ)',
            data: sleepData,
            backgroundColor: barColors,
            borderRadius: 8,
            yAxisID: 'y'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        onClick: (event, elements) => {
          if (elements && elements.length > 0) {
            const elIndex = elements[0].index;
            const item = history[elIndex];
            if (item) openHealthLogModal(item.dateIso, 'sleep');
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: textColor, font: { weight: '700' } } },
          y: {
            type: 'linear', display: true, position: 'left',
            suggestedMax: 10,
            grid: { color: gridColor },
            ticks: { color: textColor, callback: v => `${v}h` }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: items => {
                if (!items.length) return '';
                const item = history[items[0].dataIndex];
                if (!item) return '';
                return `${isEn ? item.dayEn : item.day} (${item.dateShort})${item.isToday ? ' - Hôm nay' : ''}`;
              },
              label: ctx => {
                const val = ctx.parsed.y;
                if (val === null || val === undefined || isNaN(val)) {
                  return isEn ? ' ⏳ No data (Click to log sleep)' : ' ⏳ Chưa có dữ liệu (Bấm để nhập giờ ngủ)';
                }
                const ev = evaluateSleepQuality(val);
                return [
                  ` Thời lượng: ${val} giờ (${ev.cycles} chu kỳ 90m)`,
                  ` Đánh giá: ${ev.title}`
                ];
              }
            }
          }
        }
      }
    });
  }

  // --- Quick Health Actions ---
  function addSteps(amount) {
    healthData.steps += amount;
    const now = new Date();
    const todayIso = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    if (!healthData.dailyLogs) healthData.dailyLogs = {};
    healthData.dailyLogs[todayIso] = {
      steps: healthData.steps,
      calories: calcCalories(healthData.steps),
      water: healthData.waterIntakeMl || 0,
      sleep: healthData.sleepHours || 7.5,
      bedtime: healthData.bedtime || '23:00',
      wakeTime: healthData.wakeTime || '06:30'
    };
    saveHealthData();
    showHint(currentLang === 'en'
      ? `👟 Added +${amount} steps! Total: ${healthData.steps.toLocaleString()}`
      : `👟 Đã thêm +${amount} bước! Tổng: ${healthData.steps.toLocaleString()} bước.`);
  }

  function addWater(amount) {
    healthData.waterIntakeMl += amount;
    healthData.lastWaterTime = Date.now();
    const now = new Date();
    const todayIso = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    if (!healthData.dailyLogs) healthData.dailyLogs = {};
    if (!healthData.dailyLogs[todayIso]) {
      healthData.dailyLogs[todayIso] = { steps: healthData.steps, calories: calcCalories(healthData.steps), water: healthData.waterIntakeMl, sleep: healthData.sleepHours || 7.5 };
    } else {
      healthData.dailyLogs[todayIso].water = healthData.waterIntakeMl;
    }
    saveHealthData();
    showHint(currentLang === 'en'
      ? `💧 Drank +${amount}ml! Total: ${healthData.waterIntakeMl} ml`
      : `💧 Đã uống thêm +${amount}ml! Tổng: ${healthData.waterIntakeMl} ml.`);
  }

  // Button hooks
  document.getElementById('btn-ov-add-steps')?.addEventListener('click', () => addSteps(500));
  document.getElementById('btn-health-add-500')?.addEventListener('click', () => addSteps(500));
  document.getElementById('btn-health-add-1000')?.addEventListener('click', () => addSteps(1000));

  document.getElementById('btn-ov-add-water')?.addEventListener('click', () => addWater(250));
  document.getElementById('btn-health-add-water-kpi')?.addEventListener('click', () => addWater(250));
  document.getElementById('btn-drink-now')?.addEventListener('click', () => addWater(250));

  document.getElementById('btn-reset-water-today')?.addEventListener('click', () => {
    if (confirm(currentLang === 'en' ? 'Reset today\'s water intake to 0?' : 'Đặt lại lượng nước uống hôm nay về 0?')) {
      healthData.waterIntakeMl = 0;
      saveHealthData();
    }
  });

  document.getElementById('toggle-water-reminder')?.addEventListener('change', (e) => {
    healthData.waterReminderEnabled = e.target.checked;
    saveHealthData();
  });
  document.getElementById('toggle-sleep-reminder')?.addEventListener('change', (e) => {
    healthData.sleepReminderEnabled = e.target.checked;
    saveHealthData();
  });

  // --- MODAL: Health Log Modal (Nhập riêng từng mục hoặc tất cả) ---
  const modalHealthLog = document.getElementById('modal-health-log');
  const formHealthLog = document.getElementById('form-health-log');

  function setHealthLogModalMode(mode) {
    currentHealthLogMode = mode || 'all';
    const isEn = (currentLang === 'en');

    const iconEl = document.getElementById('modal-health-log-icon');
    const titleEl = document.getElementById('modal-health-log-title');
    const subEl = document.getElementById('modal-health-log-subtitle');
    const submitBtn = document.getElementById('btn-submit-health-log');

    const groupSteps = document.getElementById('group-log-steps');
    const groupWater = document.getElementById('group-log-water');
    const groupSleep = document.getElementById('group-log-sleep');

    const tabSteps = document.getElementById('tab-log-mode-steps');
    const tabWater = document.getElementById('tab-log-mode-water');
    const tabSleep = document.getElementById('tab-log-mode-sleep');
    const tabAll = document.getElementById('tab-log-mode-all');

    const activeTabClass = 'bg-white dark:bg-slate-700 shadow-xs text-slate-900 dark:text-white font-extrabold';
    const inactiveTabClass = 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold';

    const tabs = [
      { id: 'steps', el: tabSteps },
      { id: 'water', el: tabWater },
      { id: 'sleep', el: tabSleep },
      { id: 'all', el: tabAll }
    ];

    tabs.forEach(t => {
      if (t.el) {
        if (t.id === currentHealthLogMode) {
          t.el.className = `flex-1 py-1.5 px-2 rounded-xl transition-all text-center flex items-center justify-center gap-1 ${activeTabClass}`;
        } else {
          t.el.className = `flex-1 py-1.5 px-2 rounded-xl transition-all text-center flex items-center justify-center gap-1 ${inactiveTabClass}`;
        }
      }
    });

    if (currentHealthLogMode === 'steps') {
      if (iconEl) iconEl.innerHTML = '<i class="fa-solid fa-person-walking text-emerald-500 text-lg"></i>';
      if (titleEl) titleEl.textContent = isEn ? 'Log Steps' : 'Ghi Nhận Bước Chân';
      if (subEl) subEl.textContent = isEn ? 'Enter daily steps walked' : 'Nhập số bước chân cho ngày đã chọn';
      if (submitBtn) submitBtn.textContent = isEn ? 'Save Steps' : 'Lưu bước chân';

      if (groupSteps) groupSteps.classList.remove('hidden');
      if (groupWater) groupWater.classList.add('hidden');
      if (groupSleep) groupSleep.classList.add('hidden');
    } else if (currentHealthLogMode === 'water') {
      if (iconEl) iconEl.innerHTML = '<i class="fa-solid fa-glass-water text-sky-500 text-lg"></i>';
      if (titleEl) titleEl.textContent = isEn ? 'Log Water Intake' : 'Ghi Nhận Nước Uống';
      if (subEl) subEl.textContent = isEn ? 'Enter daily water consumed (ml)' : 'Nhập lượng nước uống trong ngày (ml)';
      if (submitBtn) submitBtn.textContent = isEn ? 'Save Water' : 'Lưu lượng nước';

      if (groupSteps) groupSteps.classList.add('hidden');
      if (groupWater) groupWater.classList.remove('hidden');
      if (groupSleep) groupSleep.classList.add('hidden');
    } else if (currentHealthLogMode === 'sleep') {
      if (iconEl) iconEl.innerHTML = '<i class="fa-solid fa-moon text-indigo-500 text-lg"></i>';
      if (titleEl) titleEl.textContent = isEn ? 'Log Sleep & 90m Cycles' : 'Ghi Nhận Giấc Ngủ';
      if (subEl) subEl.textContent = isEn ? 'Track 90-min cycles and sleep duration' : 'Nhập giờ ngủ, thức và chu kỳ 90 phút';
      if (submitBtn) submitBtn.textContent = isEn ? 'Save Sleep' : 'Lưu giờ ngủ';

      if (groupSteps) groupSteps.classList.add('hidden');
      if (groupWater) groupWater.classList.add('hidden');
      if (groupSleep) groupSleep.classList.remove('hidden');
    } else {
      // Mode 'all'
      if (iconEl) iconEl.innerHTML = '<i class="fa-solid fa-notes-medical text-emerald-500 text-lg"></i>';
      if (titleEl) titleEl.textContent = isEn ? 'Log Health Metrics' : 'Ghi Nhận Chỉ Số Sức Khỏe';
      if (subEl) subEl.textContent = isEn ? 'Update steps, water intake and sleep' : 'Cập nhật nhanh bước chân, lượng nước và giấc ngủ';
      if (submitBtn) submitBtn.textContent = isEn ? 'Save All Metrics' : 'Lưu tất cả chỉ số';

      if (groupSteps) groupSteps.classList.remove('hidden');
      if (groupWater) groupWater.classList.remove('hidden');
      if (groupSleep) groupSleep.classList.remove('hidden');
    }
  }

  function updateSleepEvalPreview(hrs) {
    const p = document.getElementById('input-log-sleep-eval-preview');
    if (!p) return;
    const ev = evaluateSleepQuality(hrs);
    p.textContent = `${ev.title} (${ev.cycles} ${currentLang === 'en' ? 'cycles of 90m' : 'chu kỳ 90m'}) - ${ev.badgeText}`;
  }

  function openHealthLogModal(prefillDate, mode = 'all') {
    modalHealthLog?.classList.remove('hidden');
    const now = new Date();
    const todayIso = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    const dateInput = document.getElementById('input-log-date');
    const targetDate = prefillDate || todayIso;
    if (dateInput) dateInput.value = targetDate;

    setHealthLogModalMode(mode);

    const existingLog = (healthData.dailyLogs && healthData.dailyLogs[targetDate]) ? healthData.dailyLogs[targetDate] : null;
    const currentStepsVal = existingLog ? existingLog.steps : (targetDate === todayIso ? healthData.steps : 0);
    const currentWaterVal = existingLog ? existingLog.water : (targetDate === todayIso ? healthData.waterIntakeMl : 0);
    const currentSleepVal = existingLog ? existingLog.sleep : (targetDate === todayIso ? healthData.sleepHours : 7.5);

    const stInp = document.getElementById('input-log-steps');
    if (stInp) {
      stInp.value = currentStepsVal > 0 ? currentStepsVal : '';
      stInp.placeholder = currentStepsVal > 0 
        ? `${currentLang === 'en' ? 'Current' : 'Hiện có'}: ${currentStepsVal.toLocaleString()} ${currentLang === 'en' ? 'steps' : 'bước'}`
        : 'VD: 8000';
    }
    const wtInp = document.getElementById('input-log-water');
    if (wtInp) {
      wtInp.value = currentWaterVal > 0 ? currentWaterVal : '';
      wtInp.placeholder = currentWaterVal > 0
        ? `${currentLang === 'en' ? 'Current' : 'Hiện có'}: ${currentWaterVal.toLocaleString()} ml`
        : 'VD: 2000';
    }
    
    const bedInp = document.getElementById('input-log-bedtime');
    const wakeInp = document.getElementById('input-log-waketime');
    if (bedInp) bedInp.value = (existingLog && existingLog.bedtime) ? existingLog.bedtime : (healthData.bedtime || '23:00');
    if (wakeInp) wakeInp.value = (existingLog && existingLog.wakeTime) ? existingLog.wakeTime : (healthData.wakeTime || '06:30');
    
    const sleepHrsInp = document.getElementById('input-log-sleep-hours');
    if (sleepHrsInp) {
      sleepHrsInp.value = currentSleepVal || 7.5;
      updateSleepEvalPreview(Number(sleepHrsInp.value));
    }

    setTimeout(() => {
      if (mode === 'steps') stInp?.focus();
      else if (mode === 'water') wtInp?.focus();
      else if (mode === 'sleep') sleepHrsInp?.focus();
    }, 100);
  }

  function closeHealthLogModal() { modalHealthLog?.classList.add('hidden'); }

  // Tự động tính số giờ khi đổi bedtime / waketime
  function recalcModalSleepFromTimes() {
    const bVal = document.getElementById('input-log-bedtime')?.value;
    const wVal = document.getElementById('input-log-waketime')?.value;
    if (bVal && wVal) {
      const [bH, bM] = bVal.split(':').map(Number);
      const [wH, wM] = wVal.split(':').map(Number);
      let diffM = (wH * 60 + wM) - (bH * 60 + bM);
      if (diffM < 0) diffM += 24 * 60;
      const hrs = Math.round((diffM / 60) * 10) / 10;
      const sInp = document.getElementById('input-log-sleep-hours');
      if (sInp) sInp.value = hrs;
      updateSleepEvalPreview(hrs);
    }
  }

  document.getElementById('input-log-bedtime')?.addEventListener('change', recalcModalSleepFromTimes);
  document.getElementById('input-log-waketime')?.addEventListener('change', recalcModalSleepFromTimes);
  document.getElementById('input-log-sleep-hours')?.addEventListener('input', (e) => {
    updateSleepEvalPreview(Number(e.target.value || 0));
  });

  // Modal mode switch tabs
  document.getElementById('tab-log-mode-steps')?.addEventListener('click', () => setHealthLogModalMode('steps'));
  document.getElementById('tab-log-mode-water')?.addEventListener('click', () => setHealthLogModalMode('water'));
  document.getElementById('tab-log-mode-sleep')?.addEventListener('click', () => setHealthLogModalMode('sleep'));
  document.getElementById('tab-log-mode-all')?.addEventListener('click', () => setHealthLogModalMode('all'));

  // Open modal button hooks
  document.getElementById('btn-chart-add-steps')?.addEventListener('click', () => openHealthLogModal(null, 'steps'));
  document.getElementById('btn-chart-add-sleep')?.addEventListener('click', () => openHealthLogModal(null, 'sleep'));
  document.getElementById('btn-chart-add-water')?.addEventListener('click', () => openHealthLogModal(null, 'water'));
  document.getElementById('btn-open-health-log-modal')?.addEventListener('click', () => openHealthLogModal(null, 'all'));
  document.getElementById('btn-close-health-log')?.addEventListener('click', closeHealthLogModal);
  document.getElementById('btn-cancel-health-log')?.addEventListener('click', closeHealthLogModal);
  modalHealthLog?.addEventListener('click', e => { if (e.target === modalHealthLog) closeHealthLogModal(); });

  document.querySelectorAll('.btn-quick-add-step-input').forEach(b => {
    b.addEventListener('click', (e) => {
      const inp = document.getElementById('input-log-steps');
      if (inp) inp.value = Number(inp.value || 0) + Number(e.currentTarget.dataset.val);
    });
  });
  document.querySelectorAll('.btn-quick-add-water-input').forEach(b => {
    b.addEventListener('click', (e) => {
      const inp = document.getElementById('input-log-water');
      if (inp) inp.value = Number(inp.value || 0) + Number(e.currentTarget.dataset.val);
    });
  });

  formHealthLog?.addEventListener('submit', (e) => {
    e.preventDefault();
    const now = new Date();
    const todayIso = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    const dateVal = document.getElementById('input-log-date')?.value || todayIso;
    const stVal = Number(document.getElementById('input-log-steps')?.value || 0);
    const wtVal = Number(document.getElementById('input-log-water')?.value || 0);
    const bedVal = document.getElementById('input-log-bedtime')?.value;
    const wakeVal = document.getElementById('input-log-waketime')?.value;
    const directSleepVal = Number(document.getElementById('input-log-sleep-hours')?.value || 0);

    let sleepHrs = directSleepVal > 0 ? directSleepVal : (healthData.sleepHours || 7.5);
    if (!directSleepVal && bedVal && wakeVal) {
      const [bH, bM] = bedVal.split(':').map(Number);
      const [wH, wM] = wakeVal.split(':').map(Number);
      let diffM = (wH * 60 + wM) - (bH * 60 + bM);
      if (diffM < 0) diffM += 24 * 60;
      sleepHrs = Math.round((diffM / 60) * 10) / 10;
    }

    if (!healthData.dailyLogs) healthData.dailyLogs = {};
    if (!healthData.dailyLogs[dateVal]) {
      healthData.dailyLogs[dateVal] = { steps: null, calories: null, water: null, sleep: null, bedtime: null, wakeTime: null };
    }

    const log = healthData.dailyLogs[dateVal];

    if (currentHealthLogMode === 'steps') {
      if (stVal > 0) {
        log.steps = stVal;
        log.calories = calcCalories(stVal);
        if (dateVal === todayIso) {
          healthData.steps = stVal;
        }
      }
    } else if (currentHealthLogMode === 'water') {
      if (wtVal > 0) {
        log.water = wtVal;
        if (dateVal === todayIso) {
          healthData.waterIntakeMl = wtVal;
          healthData.lastWaterTime = Date.now();
        }
      }
    } else if (currentHealthLogMode === 'sleep') {
      if (sleepHrs > 0) {
        log.sleep = sleepHrs;
        log.bedtime = bedVal;
        log.wakeTime = wakeVal;
        if (dateVal === todayIso) {
          healthData.sleepHours = sleepHrs;
          healthData.bedtime = bedVal;
          healthData.wakeTime = wakeVal;
        }
      }
    } else {
      // Mode 'all'
      if (stVal > 0) {
        log.steps = stVal;
        log.calories = calcCalories(stVal);
        if (dateVal === todayIso) healthData.steps = stVal;
      }
      if (wtVal > 0) {
        log.water = wtVal;
        if (dateVal === todayIso) {
          healthData.waterIntakeMl = wtVal;
          healthData.lastWaterTime = Date.now();
        }
      }
      if (sleepHrs > 0) {
        log.sleep = sleepHrs;
        log.bedtime = bedVal;
        log.wakeTime = wakeVal;
        if (dateVal === todayIso) {
          healthData.sleepHours = sleepHrs;
          healthData.bedtime = bedVal;
          healthData.wakeTime = wakeVal;
        }
      }
    }

    saveHealthData();
    closeHealthLogModal();

    const modeMsg = currentHealthLogMode === 'steps' ? 'bước chân'
      : currentHealthLogMode === 'water' ? 'lượng nước'
      : currentHealthLogMode === 'sleep' ? 'giấc ngủ'
      : 'chỉ số sức khỏe';

    showHint(currentLang === 'en' 
      ? `✅ Saved ${modeMsg} for ${dateVal}!` 
      : `✅ Đã lưu ${modeMsg} ngày ${dateVal}!`);
  });

  // --- MODAL: Health Settings Modal ---
  const modalHealthSettings = document.getElementById('modal-health-settings');
  const formHealthSettings = document.getElementById('form-health-settings');

  function openHealthSettingsModal() {
    modalHealthSettings?.classList.remove('hidden');
    document.getElementById('setting-health-steps-target').value = healthData.stepsTarget || 10000;
    document.getElementById('setting-health-water-target').value = healthData.waterTargetMl || 2000;
    document.getElementById('setting-health-bedtime').value = healthData.bedtime || '22:30';
    document.getElementById('setting-health-waketime').value = healthData.wakeTime || '06:00';
    document.getElementById('setting-health-water-reminder-check').checked = healthData.waterReminderEnabled !== false;
    document.getElementById('setting-health-sleep-reminder-check').checked = healthData.sleepReminderEnabled !== false;
  }
  function closeHealthSettingsModal() { modalHealthSettings?.classList.add('hidden'); }

  document.getElementById('btn-open-health-settings')?.addEventListener('click', openHealthSettingsModal);
  document.getElementById('btn-edit-sleep-settings')?.addEventListener('click', openHealthSettingsModal);
  document.getElementById('btn-close-health-settings')?.addEventListener('click', closeHealthSettingsModal);
  document.getElementById('btn-cancel-health-settings')?.addEventListener('click', closeHealthSettingsModal);
  modalHealthSettings?.addEventListener('click', e => { if (e.target === modalHealthSettings) closeHealthSettingsModal(); });

  formHealthSettings?.addEventListener('submit', (e) => {
    e.preventDefault();
    healthData.stepsTarget = Number(document.getElementById('setting-health-steps-target')?.value || 10000);
    healthData.waterTargetMl = Number(document.getElementById('setting-health-water-target')?.value || 2000);
    healthData.bedtime = document.getElementById('setting-health-bedtime')?.value || '22:30';
    healthData.wakeTime = document.getElementById('setting-health-waketime')?.value || '06:00';
    healthData.waterReminderEnabled = document.getElementById('setting-health-water-reminder-check')?.checked;
    healthData.sleepReminderEnabled = document.getElementById('setting-health-sleep-reminder-check')?.checked;

    saveHealthData();
    closeHealthSettingsModal();
    showHint(currentLang === 'en' ? '🎯 Health goals updated!' : '🎯 Đã lưu cài đặt mục tiêu sức khỏe!');
  });

  // Backward compatibility alias
  function updateHealth() {
    renderHealthOverviewCard();
    renderHealthView();
  }

  // Initial render
  renderHealthOverviewCard();

  /* ============================================================
   * 15. THỜI SỰ HÔM NAY (NEWS DIGEST)
   * ============================================================ */
  // Dữ liệu tin tức thời sự chính trong ngày
  const newsDatabase = [
    {
      id: 1,
      topic: 'top',
      topicLabel: 'Tiêu điểm',
      topicLabel_en: 'Highlights',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      title: 'Việt Nam đẩy mạnh chiến lược chuyển đổi số quốc gia và tăng trưởng xanh bền vững',
      title_en: 'Vietnam accelerates national digital transformation strategy and sustainable green growth',
      time: '1 giờ trước',
      time_en: '1 hour ago',
      source: 'Thời sự 24h',
      source_en: 'Daily News 24h',
      summary: 'Kế hoạch phát triển các trung tâm dữ liệu và giải pháp công nghệ tuần hoàn gắn với chuyển đổi kép 2026.',
      summary_en: 'Strategic roadmap for modern data centers and circular tech solutions aligned with the 2026 twin transformation.'
    },
    {
      id: 2,
      topic: 'tech',
      topicLabel: 'Công nghệ & AI',
      topicLabel_en: 'Tech & AI',
      badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      title: 'Làn sóng AI Agent bùng nổ: Tự động hóa tác vụ cá nhân và quản lý dữ liệu an toàn',
      title_en: 'AI Agent surge: Personal task automation and secure local-first data workflows',
      time: '2 giờ trước',
      time_en: '2 hours ago',
      source: 'TechPulse',
      source_en: 'TechPulse',
      summary: 'Các chuyên gia đánh giá các dashboard cá nhân chạy cục bộ (local-first) đem lại sự an toàn và hiệu suất làm việc vượt trội.',
      summary_en: 'Tech experts highlight how local-first personal dashboards ensure data security and superior productivity.'
    },
    {
      id: 3,
      topic: 'economy',
      topicLabel: 'Kinh tế',
      topicLabel_en: 'Economy',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      title: 'Thị trường tài chính ổn định: Xu hướng quản lý chi tiêu thông minh tăng 28%',
      title_en: 'Financial market stability: Smart expense management adoption grows 28%',
      time: '3 giờ trước',
      time_en: '3 hours ago',
      source: 'Kinh tế & Đầu tư',
      source_en: 'Finance & Markets',
      summary: 'Người trẻ ngày càng ưa chuộng các mô hình ghi chép tài chính 50/30/20 để xây dựng thói quen tích lũy dài hạn.',
      summary_en: 'Young professionals increasingly adopt 50/30/20 budgeting frameworks to foster disciplined long-term savings.'
    },
    {
      id: 4,
      topic: 'life',
      topicLabel: 'Đời sống',
      topicLabel_en: 'Lifestyle',
      badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      title: 'Phương pháp Pomodoro & Thói quen vận động: Chìa khóa vàng cho hiệu suất làm việc bền bỉ',
      title_en: 'Pomodoro technique & movement habits: The gold standard for sustainable productivity',
      time: '4 giờ trước',
      time_en: '4 hours ago',
      source: 'Sống Khỏe',
      source_en: 'Healthy Life',
      summary: 'Kết hợp các phiên tập trung sâu 25 phút cùng mục tiêu 10.000 bước đi bộ mỗi ngày giúp tái tạo năng lượng hiệu quả.',
      summary_en: 'Pairing 25-minute deep focus sprints with a 10,000 steps daily target restores mental energy and stamina.'
    },
    {
      id: 5,
      topic: 'tech',
      topicLabel: 'Công nghệ & AI',
      topicLabel_en: 'Tech & AI',
      badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      title: 'Phát triển ứng dụng Web thế hệ mới: Tối ưu hóa trải nghiệm giao diện người dùng sạch và tinh gọn',
      title_en: 'Modern web app development: Streamlining user experience with clean and modular design',
      time: '5 giờ trước',
      time_en: '5 hours ago',
      source: 'DevHub',
      source_en: 'DevHub',
      summary: 'Các xu hướng thiết kế UI hiện đại đề cao khả năng hiển thị cô đọng 4-5 dòng kèm nút mở rộng chi tiết khi cần.',
      summary_en: 'Modern UI paradigms emphasize concise 4-5 line compact cards with instant expand-on-demand details.'
    },
    {
      id: 6,
      topic: 'economy',
      topicLabel: 'Kinh tế',
      topicLabel_en: 'Economy',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      title: 'Bí quyết bảo toàn dòng tiền: Theo dõi biến động chi tiêu theo 12 tháng liên tục',
      title_en: 'Cash flow preservation insights: Tracking 12-month spending trends continuously',
      time: '6 giờ trước',
      time_en: '6 hours ago',
      source: 'Tài chính Cá nhân',
      source_en: 'Personal Wealth',
      summary: 'Sử dụng biểu đồ tròn phân tích danh mục chi tiêu giúp phát hiện sớm các khoản lãng phí tiềm ẩn.',
      summary_en: 'Visual spending breakdowns and period tracking empower users to catch hidden budget leakages early.'
    }
  ];

  // ============================================================
  // QUẢN LÝ TIN TỨC THỜI SỰ TRỰC TIẾP (REAL-TIME RSS & LOCAL FALLBACK)
  // ============================================================
  const NEWS_FEEDS = {
    all: 'https://vnexpress.net/rss/tin-moi-nhat.rss',
    top: 'https://vnexpress.net/rss/thoi-su.rss',
    tech: 'https://vnexpress.net/rss/so-hoa.rss',
    economy: 'https://vnexpress.net/rss/kinh-doanh.rss',
    life: 'https://vnexpress.net/rss/doi-song.rss'
  };

  const NEWS_PREF_KEY = 'mylife_news_topics_pref';
  let savedTopics = JSON.parse(localStorage.getItem(NEWS_PREF_KEY)) || ['top', 'tech', 'economy', 'life'];
  let currentNewsTopic = 'all';
  let newsExpanded = false;
  let isFetchingNews = false;
  const realtimeNewsCache = {};

  const newsListEl = document.getElementById('news-list');
  const newsFooterLbl = document.getElementById('news-footer-label');
  const btnToggleAllNews = document.getElementById('btn-toggle-all-news');
  const btnRefreshNews = document.getElementById('btn-refresh-news');
  const iconRefreshNews = document.getElementById('icon-refresh-news');

  // Định dạng thời gian trôi qua thực tế (Relative Time)
  function formatRelativeTime(dateInput) {
    if (!dateInput) return (currentLang === 'en' ? 'Just now' : 'Vừa xong');
    const date = new Date(dateInput);
    const now = new Date();
    const diffMs = now - date;
    if (isNaN(diffMs) || diffMs < 0) return (currentLang === 'en' ? 'Just now' : 'Vừa xong');
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return (currentLang === 'en' ? 'Just now' : 'Vừa xong');
    if (diffMins < 60) return (currentLang === 'en' ? `${diffMins}m ago` : `${diffMins} phút trước`);
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return (currentLang === 'en' ? `${diffHours}h ago` : `${diffHours} giờ trước`);
    const diffDays = Math.floor(diffHours / 24);
    return (currentLang === 'en' ? `${diffDays}d ago` : `${diffDays} ngày trước`);
  }

  // Tải tin tức thời gian thực từ VnExpress RSS qua API proxy
  async function fetchRealtimeNews(topic = 'all', force = false) {
    if (isFetchingNews) return;
    const cacheKey = `news_${topic}`;
    const now = Date.now();

    // Dùng cache nếu chưa quá 8 phút và không bắt buộc refresh
    if (!force && realtimeNewsCache[cacheKey] && (now - realtimeNewsCache[cacheKey].timestamp < 8 * 60 * 1000)) {
      renderNewsList();
      return;
    }

    isFetchingNews = true;
    if (iconRefreshNews) iconRefreshNews.classList.add('fa-spin');

    const feedUrl = NEWS_FEEDS[topic] || NEWS_FEEDS.all;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

    try {
      const resp = await fetch(apiUrl, { cache: 'no-cache' });
      if (!resp.ok) throw new Error(`HTTP error ${resp.status}`);
      const data = await resp.json();

      if (data && data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
        const parsedItems = data.items.map((item, idx) => {
          const cleanDesc = (item.description || item.content || '').replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
          
          let assignedTopic = topic;
          if (assignedTopic === 'all') {
            const lowTitle = (item.title || '').toLowerCase();
            const lowLink = (item.link || '').toLowerCase();
            if (lowLink.includes('/so-hoa') || lowLink.includes('/khoa-hoc') || lowTitle.includes('ai') || lowTitle.includes('công nghệ') || lowTitle.includes('chip') || lowTitle.includes('điện thoại') || lowTitle.includes('phần mềm') || lowTitle.includes('robot')) {
              assignedTopic = 'tech';
            } else if (lowLink.includes('/kinh-doanh') || lowLink.includes('/bat-dong-san') || lowTitle.includes('giá') || lowTitle.includes('vàng') || lowTitle.includes('chứng khoán') || lowTitle.includes('doanh nghiệp') || lowTitle.includes('ngân hàng') || lowTitle.includes('kinh tế') || lowTitle.includes('bất động sản') || lowTitle.includes('thị trường')) {
              assignedTopic = 'economy';
            } else if (lowLink.includes('/doi-song') || lowLink.includes('/suc-khoe') || lowTitle.includes('sức khỏe') || lowTitle.includes('bệnh') || lowTitle.includes('sống') || lowTitle.includes('ẩm thực') || lowTitle.includes('du lịch') || lowTitle.includes('nghệ sĩ') || lowTitle.includes('gym') || lowTitle.includes('dáng')) {
              assignedTopic = 'life';
            } else {
              assignedTopic = 'top';
            }
          }

          let topicLabel = 'Tiêu điểm';
          let topicLabel_en = 'Highlights';
          let badgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
          let sourceName = 'VnExpress Thời Sự';

          if (assignedTopic === 'tech') {
            topicLabel = 'Công nghệ & AI';
            topicLabel_en = 'Tech & AI';
            badgeClass = 'bg-blue-500/20 text-blue-300 border-blue-500/30';
            sourceName = 'VnExpress Số Hóa';
          } else if (assignedTopic === 'economy') {
            topicLabel = 'Kinh tế';
            topicLabel_en = 'Economy';
            badgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
            sourceName = 'VnExpress Kinh Doanh';
          } else if (assignedTopic === 'life') {
            topicLabel = 'Đời sống';
            topicLabel_en = 'Lifestyle';
            badgeClass = 'bg-rose-500/20 text-rose-300 border-rose-500/30';
            sourceName = 'VnExpress Đời Sống';
          }

          return {
            id: `real_${topic}_${idx}`,
            topic: assignedTopic,
            topicLabel: topicLabel,
            topicLabel_en: topicLabel_en,
            badgeClass: badgeClass,
            title: item.title,
            title_en: item.title,
            time: formatRelativeTime(item.pubDate),
            time_en: formatRelativeTime(item.pubDate),
            pubDate: item.pubDate,
            source: sourceName,
            source_en: sourceName,
            summary: cleanDesc.length > 140 ? cleanDesc.slice(0, 140) + '...' : cleanDesc,
            summary_en: cleanDesc.length > 140 ? cleanDesc.slice(0, 140) + '...' : cleanDesc,
            link: item.link
          };
        });

        realtimeNewsCache[cacheKey] = {
          items: parsedItems,
          timestamp: now
        };
      }
    } catch (err) {
      console.warn('Realtime RSS fetch failed, falling back to local news digest:', err);
    } finally {
      isFetchingNews = false;
      if (iconRefreshNews) iconRefreshNews.classList.remove('fa-spin');
      renderNewsList();
    }
  }

  function getActiveNewsItems() {
    const cacheKey = `news_${currentNewsTopic}`;
    if (realtimeNewsCache[cacheKey] && realtimeNewsCache[cacheKey].items && realtimeNewsCache[cacheKey].items.length > 0) {
      return realtimeNewsCache[cacheKey].items;
    }
    // Lọc theo chủ đề từ cache tổng 'all' nếu có
    if (realtimeNewsCache['news_all'] && realtimeNewsCache['news_all'].items && realtimeNewsCache['news_all'].items.length > 0) {
      if (currentNewsTopic === 'all') {
        return realtimeNewsCache['news_all'].items;
      }
      const matched = realtimeNewsCache['news_all'].items.filter(n => n.topic === currentNewsTopic);
      if (matched.length > 0) return matched;
      return realtimeNewsCache['news_all'].items;
    }
    // Fallback sang database tích hợp sẵn (cập nhật lại thời gian tương đối theo giờ thực tế)
    return newsDatabase.map(n => ({
      ...n,
      time: formatRelativeTime(new Date(Date.now() - n.id * 35 * 60 * 1000)),
      time_en: formatRelativeTime(new Date(Date.now() - n.id * 35 * 60 * 1000))
    }));
  }

  function renderNewsList() {
    if (!newsListEl) return;
    const isEn = (currentLang === 'en');
    const allAvailableNews = getActiveNewsItems();

    // 1. Lọc theo các chủ đề người dùng đã bật trong cài đặt
    let filtered = allAvailableNews.filter(n => savedTopics.includes(n.topic));

    // 2. Lọc tiếp theo chip phân loại đang chọn
    if (currentNewsTopic !== 'all') {
      filtered = filtered.filter(n => n.topic === currentNewsTopic);
    }

    if (!filtered.length) {
      newsListEl.innerHTML = `
        <div class="col-span-1 md:col-span-2 text-center py-6 text-slate-500 text-xs">
          <i class="fa-regular fa-newspaper text-2xl text-slate-600 mb-2 block"></i>
          <p class="font-medium text-slate-400">${isEn ? 'No news stories found in this topic.' : 'Không có tin tức nào trong chủ đề này.'}</p>
          <p class="text-[11px] text-slate-500 mt-1">${isEn ? 'Click settings (⚙️) above to enable topics you like!' : 'Bấm biểu tượng cài đặt (⚙️) phía trên để bật thêm chủ đề bạn yêu thích!'}</p>
        </div>`;
      if (newsFooterLbl) newsFooterLbl.textContent = isEn ? '0 stories shown' : '0 tin hiển thị';
      if (btnToggleAllNews) btnToggleAllNews.style.display = 'none';
      return;
    }

    // Giới hạn 4 tin mặc định để giao diện luôn clean
    const displayNews = newsExpanded ? filtered : filtered.slice(0, 4);

    newsListEl.innerHTML = '';
    displayNews.forEach(item => {
      const itemTitle = (isEn && item.title_en) ? item.title_en : item.title;
      const itemSummary = (isEn && item.summary_en) ? item.summary_en : item.summary;
      const itemTopic = (isEn && item.topicLabel_en) ? item.topicLabel_en : item.topicLabel;
      const itemTime = formatRelativeTime(item.pubDate) || ((isEn && item.time_en) ? item.time_en : item.time);
      const itemSource = (isEn && item.source_en) ? item.source_en : item.source;

      const card = document.createElement('div');
      card.className = 'p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 hover:bg-slate-800 hover:border-blue-500/50 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group flex flex-col justify-between shadow-xs';
      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between text-[10px] mb-1.5 flex-wrap gap-1">
            <span class="inline-flex items-center px-2 py-0.5 rounded-md border font-bold ${item.badgeClass}">${itemTopic}</span>
            <span class="text-slate-400 group-hover:text-slate-300 font-medium">
              <i class="fa-regular fa-clock mr-1 text-slate-500"></i>${itemTime} • <b class="text-slate-300">${itemSource}</b>
            </span>
          </div>
          <h5 class="font-bold text-slate-100 text-xs leading-snug group-hover:text-blue-300 transition-colors line-clamp-2">
            ${itemTitle}
            <i class="fa-solid fa-arrow-up-right-from-square text-[9px] ml-1 text-slate-500 group-hover:text-blue-400 transition-colors"></i>
          </h5>
        </div>
        <p class="text-[11px] text-slate-400 mt-1.5 line-clamp-2 group-hover:text-slate-300 font-medium leading-relaxed">${itemSummary}</p>
      `;

      card.addEventListener('click', () => {
        if (item.link) {
          window.open(item.link, '_blank', 'noopener,noreferrer');
          showHint(isEn ? `🌐 Opening: ${itemTitle.slice(0, 45)}...` : `🌐 Đang mở bài báo: ${itemTitle.slice(0, 45)}...`);
        } else {
          alert(`📰 [${itemTopic}] ${itemTitle}\n\nNguồn: ${itemSource} (${itemTime})\n\nTóm tắt nội dung:\n${itemSummary}`);
        }
      });
      newsListEl.appendChild(card);
    });

    const now = new Date();
    const timeFormatted = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    if (newsFooterLbl) {
      newsFooterLbl.textContent = isEn 
        ? `Live • Updated at ${timeFormatted} • Showing ${Math.min(displayNews.length, filtered.length)} / ${filtered.length} stories` 
        : `Thời gian thực • Cập nhật lúc ${timeFormatted} • Hiển thị ${Math.min(displayNews.length, filtered.length)} / ${filtered.length} tin`;
    }

    if (btnToggleAllNews) {
      if (filtered.length > 4) {
        btnToggleAllNews.style.display = '';
        btnToggleAllNews.textContent = isEn
          ? (newsExpanded ? 'Collapse (show 4) ↑' : `View all (${filtered.length} stories) ↓`)
          : (newsExpanded ? 'Thu gọn (hiện 4 tin) ↑' : `Xem tất cả (${filtered.length} tin) ↓`);
      } else {
        btnToggleAllNews.style.display = 'none';
      }
    }
  }

  // Toggle xem tất cả / thu gọn tin tức
  btnToggleAllNews?.addEventListener('click', () => {
    newsExpanded = !newsExpanded;
    renderNewsList();
  });

  // Nút Làm mới tin tức trực tiếp
  btnRefreshNews?.addEventListener('click', () => {
    fetchRealtimeNews(currentNewsTopic, true);
    showHint(currentLang === 'en' ? '🔄 Refreshing real-time news...' : '🔄 Đang cập nhật tin tức thời gian thực mới nhất...');
  });

  // Xử lý bộ lọc chip chủ đề
  const topicChips = document.querySelectorAll('#news-topic-chips .news-chip');
  topicChips.forEach(chip => {
    chip.addEventListener('click', () => {
      topicChips.forEach(c => {
        c.className = 'news-chip px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white font-semibold transition-all shrink-0';
      });
      chip.className = 'news-chip active px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold transition-all shrink-0';
      currentNewsTopic = chip.dataset.topic;
      newsExpanded = false;
      fetchRealtimeNews(currentNewsTopic, false);
    });
  });

  // Modal Cài đặt Chủ đề Yêu thích
  const modalNewsSettings = document.getElementById('modal-news-settings');
  const btnOpenNewsSettings = document.getElementById('btn-open-news-settings');
  const btnCloseNewsSettings = document.getElementById('btn-close-news-settings');
  const btnCancelNewsSettings = document.getElementById('btn-cancel-news-settings');
  const btnSaveNewsSettings = document.getElementById('btn-save-news-settings');

  function openNewsSettings() {
    if (!modalNewsSettings) return;
    document.querySelectorAll('.news-pref-checkbox').forEach(cb => {
      cb.checked = savedTopics.includes(cb.value);
    });
    modalNewsSettings.classList.remove('hidden');
  }

  function closeNewsSettings() {
    modalNewsSettings?.classList.add('hidden');
  }

  btnOpenNewsSettings?.addEventListener('click', openNewsSettings);
  btnCloseNewsSettings?.addEventListener('click', closeNewsSettings);
  btnCancelNewsSettings?.addEventListener('click', closeNewsSettings);
  modalNewsSettings?.addEventListener('click', e => { if (e.target === modalNewsSettings) closeNewsSettings(); });

  btnSaveNewsSettings?.addEventListener('click', () => {
    const checked = Array.from(document.querySelectorAll('.news-pref-checkbox:checked')).map(cb => cb.value);
    if (!checked.length) {
      alert(currentLang === 'vi' ? 'Vui lòng chọn ít nhất 1 chủ đề tin tức để hiển thị!' : 'Please select at least 1 news topic to display!');
      return;
    }
    savedTopics = checked;
    localStorage.setItem(NEWS_PREF_KEY, JSON.stringify(savedTopics));
    closeNewsSettings();
    renderNewsList();
  });

  // Khởi động tải tin tức thời gian thực ban đầu và lặp lại định kỳ mỗi 10 phút
  fetchRealtimeNews('all', false);
  setInterval(() => {
    fetchRealtimeNews(currentNewsTopic, true);
  }, 10 * 60 * 1000);

  /* ============================================================
   * 16. TRUNG TÂM THÔNG BÁO THÔNG MINH (SMART NOTIFICATIONS)
   * ============================================================ */
  let notificationsRead = false;

  const btnNoti = document.getElementById('btn-notifications');
  const dNoti   = document.getElementById('dropdown-noti');

  btnNoti?.addEventListener('click', e => {
    e.stopPropagation();
    dNoti?.classList.toggle('hidden');
    renderSmartNotifications();
  });

  document.addEventListener('click', e => {
    if (dNoti && !dNoti.contains(e.target) && e.target !== btnNoti) {
      dNoti.classList.add('hidden');
    }
  });

  document.getElementById('btn-mark-read')?.addEventListener('click', () => {
    notificationsRead = true;
    renderSmartNotifications();
  });

  document.getElementById('btn-calendar')?.addEventListener('click', () => {
    const curDate = document.getElementById('current-date-text')?.textContent || 'Hôm nay';
    alert(`📅 ${curDate}\n\nLịch trình hôm nay trống. Hãy tập trung hoàn thành các mục tiêu trên Dashboard!`);
  });

  function renderSmartNotifications() {
    const listEl = document.getElementById('notification-items-list');
    const badgeDot = document.getElementById('noti-badge-dot');
    const unreadCountEl = document.getElementById('noti-unread-count');
    if (!listEl) return;

    const notis = [];
    const now = new Date();
    const curYear = now.getFullYear().toString();
    const curMonth = (now.getMonth() + 1).toString();

    // -------------------------------------------------------------
    // A. THÔNG BÁO CÔNG VIỆC & MỤC TIÊU NGÀY (DEADLINES)
    // -------------------------------------------------------------
    const activeTasks = tasks.filter(t => !t.completed && t.status !== 'done');
    
    // 1. Task quá hạn
    const overdueTasks = activeTasks.filter(t => {
      if (!t.deadline) return false;
      const d = new Date(t.deadline);
      return !isNaN(d.getTime()) && d.getTime() < now.getTime();
    });
    if (overdueTasks.length > 0) {
      notis.push({
        id: 'task-overdue',
        type: 'urgent',
        icon: 'fa-triangle-exclamation text-rose-500',
        bg: 'bg-rose-50/80 border-rose-200',
        badge: 'Quá hạn',
        badgeColor: 'bg-rose-100 text-rose-700',
        title: `Có ${overdueTasks.length} nhiệm vụ đã quá thời hạn!`,
        desc: `Cần xử lý: "${overdueTasks[0].title}". Bấm vào để mở bảng Kanban.`,
        actionView: 'tasks'
      });
    }

    // 2. Task đến hạn hôm nay
    const todayTasks = activeTasks.filter(t => {
      if (!t.deadline) return false;
      const d = new Date(t.deadline);
      if (isNaN(d.getTime())) return false;
      return d.toDateString() === now.toDateString() && d.getTime() >= now.getTime();
    });
    if (todayTasks.length > 0) {
      notis.push({
        id: 'task-today',
        type: 'warning',
        icon: 'fa-clock text-amber-500',
        bg: 'bg-amber-50/70 border-amber-200',
        badge: 'Hạn hôm nay',
        badgeColor: 'bg-amber-100 text-amber-700',
        title: `Hôm nay cần đóng ${todayTasks.length} mục tiêu quan trọng`,
        desc: `Ưu tiên: "${todayTasks[0].title}". Hãy tập trung hoàn thành trước giờ chốt sổ.`,
        actionView: 'tasks'
      });
    }

    // 3. Đếm ngược giờ chốt sổ ngày (dailyCutoff)
    const cutoff = taskSettings.dailyCutoff || '22:00';
    const [cH, cM] = cutoff.split(':').map(Number);
    const targetCutoff = new Date();
    targetCutoff.setHours(cH, cM, 0, 0);
    const diffCutoffMins = Math.floor((targetCutoff.getTime() - now.getTime()) / 60000);

    if (diffCutoffMins > 0 && diffCutoffMins <= 360) {
      const h = Math.floor(diffCutoffMins / 60);
      const m = diffCutoffMins % 60;
      notis.push({
        id: 'daily-cutoff',
        type: 'warning',
        icon: 'fa-hourglass-half text-indigo-500',
        bg: 'bg-indigo-50/70 border-indigo-200',
        badge: 'Đóng sổ ngày',
        badgeColor: 'bg-indigo-100 text-indigo-700',
        title: `Còn ${h > 0 ? h + ' giờ ' : ''}${m} phút đến giờ chốt sổ (${cutoff})`,
        desc: `Bạn còn ${activeTasks.length} việc chưa hoàn thành. Hãy mở bảng Kanban tăng tốc!`,
        actionView: 'tasks'
      });
    }

    // -------------------------------------------------------------
    // B. THÔNG BÁO TÀI CHÍNH: CẢNH BÁO VƯỢT MỨC CHI TIÊU
    // -------------------------------------------------------------
    let curMonthIncome = 0;
    let curMonthSpent  = 0;

    transactions.forEach(t => {
      const d = new Date(t.datetime);
      if (isNaN(d.getTime())) return;
      if (d.getFullYear().toString() === curYear && (d.getMonth() + 1).toString() === curMonth) {
        if (t.type === 'income') curMonthIncome += t.amount;
        else curMonthSpent += t.amount;
      }
    });

    const curBalance = curMonthIncome - curMonthSpent;
    const spendRatio = curMonthIncome > 0 ? Math.round((curMonthSpent / curMonthIncome) * 100) : (curMonthSpent > 0 ? 100 : 0);

    if (curMonthSpent > curMonthIncome && curMonthIncome > 0) {
      notis.push({
        id: 'finance-deficit',
        type: 'danger',
        icon: 'fa-triangle-exclamation text-rose-600',
        bg: 'bg-rose-50 border-rose-200',
        badge: 'Vượt ngân sách',
        badgeColor: 'bg-rose-600 text-white',
        title: `Cảnh báo: Chi tiêu tháng ${curMonth} vượt thu nhập!`,
        desc: `Đã chi ${formatVND(curMonthSpent)} trong khi thu nhập là ${formatVND(curMonthIncome)} (Thâm hụt: -${formatVND(Math.abs(curBalance))}).`,
        actionView: 'finance'
      });
    } else if (spendRatio >= 70 && curMonthIncome > 0) {
      notis.push({
        id: 'finance-warning',
        type: 'warning',
        icon: 'fa-chart-pie text-amber-500',
        bg: 'bg-amber-50 border-amber-200',
        badge: 'Chi tiêu cao',
        badgeColor: 'bg-amber-500 text-white',
        title: `Bạn đã chi ${spendRatio}% tổng thu nhập Tháng ${curMonth}`,
        desc: `Số tiền đã tiêu: ${formatVND(curMonthSpent)}. Hãy chú ý kiểm soát các khoản chi ngoài kế hoạch.`,
        actionView: 'finance'
      });
    } else if (curMonthSpent > 0 && curBalance > 0) {
      notis.push({
        id: 'finance-safe',
        type: 'success',
        icon: 'fa-shield-halved text-emerald-500',
        bg: 'bg-emerald-50/70 border-emerald-200',
        badge: 'Dòng tiền an toàn',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        title: `Dòng tiền Tháng ${curMonth} đang thặng dư an toàn`,
        desc: `Tỷ lệ chi tiêu hiện ở mức ${spendRatio}%, tích lũy thặng dư: +${formatVND(curBalance)}.`,
        actionView: 'finance'
      });
    }

    // -------------------------------------------------------------
    // C. BÁO CÁO CUỐI THÁNG: SO SÁNH VỚI THÁNG TRƯỚC (MONTH-OVER-MONTH)
    // -------------------------------------------------------------
    const prevMonthNum = Number(curMonth) === 1 ? 12 : Number(curMonth) - 1;
    const prevYearStr  = Number(curMonth) === 1 ? (Number(curYear) - 1).toString() : curYear;
    let prevMonthSpent = 0;
    let prevMonthIncome = 0;

    transactions.forEach(t => {
      const d = new Date(t.datetime);
      if (isNaN(d.getTime())) return;
      if (d.getFullYear().toString() === prevYearStr && (d.getMonth() + 1) === prevMonthNum) {
        if (t.type === 'income') prevMonthIncome += t.amount;
        else prevMonthSpent += t.amount;
      }
    });

    if (prevMonthSpent > 0 && curMonthSpent > 0) {
      const diffSpent = curMonthSpent - prevMonthSpent;
      const diffPct = Math.round((Math.abs(diffSpent) / prevMonthSpent) * 100);
      if (diffSpent < 0) {
        notis.push({
          id: 'finance-comparison',
          type: 'report',
          icon: 'fa-arrow-trend-down text-emerald-600',
          bg: 'bg-blue-50/70 border-blue-200',
          badge: 'So sánh tháng',
          badgeColor: 'bg-blue-100 text-blue-700',
          title: `Báo cáo: Chi tiêu Tháng ${curMonth} giảm ${diffPct}% so với Tháng ${prevMonthNum}!`,
          desc: `Bạn đã tiết kiệm được ${formatVND(Math.abs(diffSpent))} so với kỳ trước. Thói quen tài chính rất tốt!`,
          actionView: 'finance'
        });
      } else {
        notis.push({
          id: 'finance-comparison',
          type: 'report',
          icon: 'fa-arrow-trend-up text-amber-500',
          bg: 'bg-blue-50/70 border-blue-200',
          badge: 'So sánh tháng',
          badgeColor: 'bg-blue-100 text-blue-700',
          title: `Báo cáo: Chi tiêu Tháng ${curMonth} tăng ${diffPct}% so với Tháng ${prevMonthNum}`,
          desc: `Chi tiêu cao hơn kỳ trước ${formatVND(diffSpent)}. Bấm vào Báo cáo để xem chi tiết các danh mục.`,
          actionView: 'finance'
        });
      }
    } else if (curMonthSpent > 0 || curMonthIncome > 0) {
      notis.push({
        id: 'finance-summary-report',
        type: 'report',
        icon: 'fa-file-invoice-dollar text-blue-600',
        bg: 'bg-blue-50/60 border-blue-200',
        badge: 'Báo cáo tháng',
        badgeColor: 'bg-blue-100 text-blue-700',
        title: `Tổng kết kỳ tài chính Tháng ${curMonth}/${curYear}`,
        desc: `Thu: +${formatVND(curMonthIncome)} • Chi: -${formatVND(curMonthSpent)} • Thặng dư: ${formatVND(curBalance)}.`,
        actionView: 'finance'
      });
    }

    // -------------------------------------------------------------
    // D. THÔNG BÁO SỨC KHỎE: NƯỚC UỐNG, GIẤC NGỦ & VẬN ĐỘNG
    // -------------------------------------------------------------
    if (typeof healthData !== 'undefined') {
      const curHour = now.getHours();
      // 1. Nhắc nhở uống nước khi thiếu nước
      if (curHour >= 13 && healthData.waterIntakeMl < healthData.waterTargetMl * 0.6) {
        notis.push({
          id: 'health-water',
          type: 'warning',
          icon: 'fa-glass-water text-sky-500',
          bg: 'bg-sky-50 border-sky-200',
          badge: currentLang === 'en' ? 'Hydration' : 'Nước uống',
          badgeColor: 'bg-sky-100 text-sky-700',
          title: currentLang === 'en' ? 'Hydration alert: You need more water!' : 'Cơ thể cần thêm nước!',
          desc: currentLang === 'en'
            ? `You drank ${healthData.waterIntakeMl}ml / ${healthData.waterTargetMl}ml today. Drink a fresh cup now to boost focus.`
            : `Bạn mới uống ${healthData.waterIntakeMl}ml / ${healthData.waterTargetMl}ml hôm nay. Hãy uống thêm 1 ly nước để giữ năng lượng!`,
          actionView: 'health'
        });
      }

      // 2. Nhắc nhở chuẩn bị đi ngủ khoa học (sau 21:00)
      if (curHour >= 21 && healthData.sleepReminderEnabled) {
        notis.push({
          id: 'health-sleep',
          type: 'report',
          icon: 'fa-moon text-indigo-500',
          bg: 'bg-indigo-50 border-indigo-200',
          badge: currentLang === 'en' ? 'Circadian Sleep' : 'Giấc ngủ',
          badgeColor: 'bg-indigo-100 text-indigo-700',
          title: currentLang === 'en' ? `Sleep reminder: Target bedtime is ${healthData.bedtime}` : `Sắp đến giờ ngủ khoa học (${healthData.bedtime})`,
          desc: currentLang === 'en'
            ? 'Reduce blue light and screen exposure 30 mins before bed for restorative deep sleep.'
            : 'Hãy tắt bớt đèn và hạn chế màn hình điện thoại 30 phút trước khi ngủ để dễ dàng vào giấc ngủ sâu.',
          actionView: 'health'
        });
      }
    }

    // Default notice if empty
    if (!notis.length) {
      notis.push({
        id: 'system-ready',
        type: 'info',
        icon: 'fa-circle-check text-blue-500',
        bg: 'bg-slate-50 border-slate-200',
        badge: 'Hệ thống',
        badgeColor: 'bg-slate-100 text-slate-600',
        title: 'Mọi mục tiêu & tài chính hôm nay đang ổn định!',
        desc: 'Không có cảnh báo khẩn cấp nào. Chúc bạn một ngày làm việc hiệu quả!',
        actionView: 'overview'
      });
    }

    // Render Notifications DOM
    listEl.innerHTML = '';
    notis.forEach(n => {
      const cardType = (n.type === 'danger' || n.type === 'urgent') ? 'urgent' : (n.type === 'warning' ? 'warning' : (n.type === 'success' ? 'success' : (n.type === 'report' ? 'report' : 'info')));
      const item = document.createElement('div');
      item.className = `noti-card noti-card-${cardType} p-3 rounded-2xl border hover:shadow-md transition-all cursor-pointer flex gap-3 items-start`;
      item.innerHTML = `
        <div class="noti-icon-box w-8 h-8 rounded-xl shadow-xs flex items-center justify-center shrink-0 mt-0.5">
          <i class="fa-solid ${n.icon} text-sm"></i>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-1 mb-1">
            <span class="text-[10px] font-bold px-1.5 py-0.5 rounded border ${n.badgeColor}">${n.badge}</span>
            <span class="text-[10px] opacity-75">${currentLang === 'en' ? 'Just now' : 'Vừa xong'}</span>
          </div>
          <p class="noti-item-title font-bold text-xs leading-snug">${n.title}</p>
          <p class="noti-item-desc text-[11px] mt-0.5 leading-relaxed">${n.desc}</p>
        </div>
      `;
      item.addEventListener('click', () => {
        dNoti?.classList.add('hidden');
        if (n.actionView === 'tasks') {
          switchMainView('tasks');
        } else if (n.actionView === 'finance') {
          if (!financeUnlocked) openLoginModal();
          else switchMainView('finance');
        } else if (n.actionView === 'health') {
          switchMainView('health');
        } else {
          switchMainView('overview');
        }
      });
      listEl.appendChild(item);
    });

    if (unreadCountEl) {
      unreadCountEl.textContent = notificationsRead ? '0 mới' : `${notis.length} mới`;
      unreadCountEl.className = notificationsRead ? 'px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold' : 'px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold';
    }
    if (badgeDot) {
      badgeDot.style.display = notificationsRead ? 'none' : 'block';
    }
  }

  // Khởi tạo thông báo ban đầu
  renderSmartNotifications();

  /* ============================================================
   * TÌM KIẾM TOÀN DIỆN THÔNG MINH (UNIVERSAL GLOBAL SEARCH)
   * Tìm kiếm xuyên suốt: Công việc, Lịch biểu, Giao dịch tài chính, Tin tức
   * ============================================================ */
  const globalSearch       = document.getElementById('global-search');
  const btnClearSearch     = document.getElementById('btn-clear-global-search');
  const searchDropdownEl   = document.getElementById('global-search-dropdown');

  function highlightMatch(text, query) {
    if (!text || !query) return text || '';
    const safeQ = query.replace(/[.*+?^$\{\}()|[\]\\]/g, '');
    if (!safeQ) return text;
    try {
      const parts = String(text).split(new RegExp(safeQ, 'gi'));
      // simple case-insensitive highlight
      const matches = String(text).match(new RegExp(safeQ, 'gi'));
      if (!matches) return text;
      let res = '';
      for (let i = 0; i < parts.length; i++) {
        res += parts[i];
        if (i < matches.length) {
          res += '<mark class="bg-amber-200 text-slate-900 rounded px-0.5 font-bold">' + matches[i] + '</mark>';
        }
      }
      return res;
    } catch(e) {
      return text;
    }
  }

  function performGlobalSearch(q) {
    if (!q || !searchDropdownEl) {
      searchDropdownEl?.classList.add('hidden');
      btnClearSearch?.classList.add('hidden');
      return;
    }

    btnClearSearch?.classList.remove('hidden');
    const query = q.toLowerCase();

    // 1. Search Tasks
    const matchedTasks = tasks.filter(t => 
      t.title.toLowerCase().includes(query) ||
      (t.description || '').toLowerCase().includes(query) ||
      (t.project || '').toLowerCase().includes(query)
    ).slice(0, 4);

    // 2. Search Transactions
    const matchedTrans = (transactions || []).filter(tx => 
      (tx.note || '').toLowerCase().includes(query) ||
      (tx.category || '').toLowerCase().includes(query) ||
      String(tx.amount).includes(query.replace(/\./g, '')) ||
      formatVND(tx.amount).toLowerCase().includes(query)
    ).slice(0, 4);

    // 3. Search News
    const matchedNews = (newsDatabase || []).filter(nw => 
      nw.title.toLowerCase().includes(query) ||
      (nw.summary || '').toLowerCase().includes(query) ||
      nw.topicLabel.toLowerCase().includes(query)
    ).slice(0, 3);

    const totalMatches = matchedTasks.length + matchedTrans.length + matchedNews.length;

    if (totalMatches === 0) {
      searchDropdownEl.innerHTML = `
        <div class="p-6 text-center">
          <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center text-sm mb-2">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <p class="text-xs font-bold text-slate-700">Không tìm thấy kết quả phù hợp</p>
          <p class="text-[11px] text-slate-400 mt-1">Không có công việc, giao dịch hay tin tức nào chứa "<b>${q}</b>"</p>
        </div>
      `;
      searchDropdownEl.classList.remove('hidden');
      return;
    }

    let html = `
      <div class="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Tìm thấy <b>${totalMatches}</b> kết quả cho "<b>${q}</b>"</span>
        <span class="text-[10px] text-slate-400">Nhấn để chuyển đến mục</span>
      </div>
      <div class="p-2 space-y-3 overflow-y-auto max-h-[420px]">
    `;

    // Group 1: Tasks
    if (matchedTasks.length > 0) {
      html += `
        <div>
          <div class="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
            <i class="fa-solid fa-list-check"></i>
            <span>Công việc & Lịch trình (${matchedTasks.length})</span>
          </div>
          <div class="space-y-1 mt-1">
      `;
      matchedTasks.forEach(t => {
        const statusBadge = t.status === 'done' 
          ? '<span class="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700 font-bold">Xong</span>'
          : t.status === 'doing'
          ? '<span class="text-[9px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 font-bold">Đang làm</span>'
          : '<span class="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-bold">To-do</span>';

        html += `
          <div class="search-result-item p-2 rounded-xl border border-transparent hover:border-indigo-100 hover:bg-indigo-50/50 cursor-pointer transition-all flex items-center justify-between gap-2" data-type="task" data-id="${t.id}">
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5">
                ${statusBadge}
                <span class="text-xs font-bold text-slate-800 truncate">${highlightMatch(t.title, q)}</span>
              </div>
              <div class="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                <span>📁 ${t.project}</span>
                ${t.deadline ? `<span>📅 ${formatShortDate(t.deadline)}</span>` : ''}
              </div>
            </div>
            <i class="fa-solid fa-chevron-right text-[10px] text-slate-300"></i>
          </div>
        `;
      });
      html += `</div></div>`;
    }

    // Group 2: Transactions
    if (matchedTrans.length > 0) {
      html += `
        <div>
          <div class="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
            <i class="fa-solid fa-wallet"></i>
            <span>Tài chính & Thu chi (${matchedTrans.length})</span>
          </div>
          <div class="space-y-1 mt-1">
      `;
      matchedTrans.forEach(tx => {
        const isInc = tx.type === 'income';
        const amtStr = (isInc ? '+' : '-') + formatVND(tx.amount);
        const amtClass = isInc ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold';

        html += `
          <div class="search-result-item p-2 rounded-xl border border-transparent hover:border-emerald-100 hover:bg-emerald-50/50 cursor-pointer transition-all flex items-center justify-between gap-2" data-type="finance" data-id="${tx.id}">
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5">
                <span class="text-xs font-bold text-slate-800 truncate">${highlightMatch(tx.note || tx.category, q)}</span>
                <span class="text-[10px] text-slate-400">(${tx.category})</span>
              </div>
              <div class="text-[10px] text-slate-400 mt-0.5">
                <span>${formatDateTimeVN(tx.datetime || tx.date)}</span>
              </div>
            </div>
            <span class="text-xs ${amtClass} shrink-0">${highlightMatch(amtStr, q)}</span>
          </div>
        `;
      });
      html += `</div></div>`;
    }

    // Group 3: News
    if (matchedNews.length > 0) {
      html += `
        <div>
          <div class="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
            <i class="fa-solid fa-newspaper"></i>
            <span>Thời sự & Tin tức (${matchedNews.length})</span>
          </div>
          <div class="space-y-1 mt-1">
      `;
      matchedNews.forEach(nw => {
        html += `
          <div class="search-result-item p-2 rounded-xl border border-transparent hover:border-blue-100 hover:bg-blue-50/50 cursor-pointer transition-all flex items-center justify-between gap-2" data-type="news" data-id="${nw.id}">
            <div class="min-w-0 flex-1">
              <span class="text-xs font-bold text-slate-800 line-clamp-1">${highlightMatch(nw.title, q)}</span>
              <div class="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                <span class="text-blue-600 font-semibold">${nw.topicLabel}</span>
                <span>• ${nw.time}</span>
              </div>
            </div>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-300"></i>
          </div>
        `;
      });
      html += `</div></div>`;
    }

    html += `</div>`;
    searchDropdownEl.innerHTML = html;
    searchDropdownEl.classList.remove('hidden');

    // Attach click handlers to search items
    searchDropdownEl.querySelectorAll('.search-result-item').forEach(el => {
      el.addEventListener('click', () => {
        const type = el.dataset.type;
        const id = Number(el.dataset.id);
        searchDropdownEl.classList.add('hidden');

        if (type === 'task') {
          switchMainView('tasks');
          const task = tasks.find(t => t.id === id);
          if (task) {
            if (task.scheduleHour && task.scheduleHour !== 'allday') {
              switchTasksSubView('calendar');
            } else {
              switchTasksSubView('board');
            }
            setTimeout(() => openTaskDetailModal(task), 100);
          }
        } else if (type === 'finance') {
          switchMainView('finance');
          // Switch to history tab
          const tabHistoryBtn = document.querySelector('[data-finance-tab="history"]');
          tabHistoryBtn?.click();
        } else if (type === 'news') {
          const nw = newsDatabase.find(n => n.id === id);
          if (nw) {
            alert(`📰 ${nw.title}\n\n${nw.summary}\n\nNguồn: ${nw.source} (${nw.time})`);
          }
        }
      });
    });
  }

  globalSearch?.addEventListener('input', (e) => {
    const q = e.target.value.trim();
    performGlobalSearch(q);
  });

  globalSearch?.addEventListener('focus', (e) => {
    const q = e.target.value.trim();
    if (q) performGlobalSearch(q);
  });

  btnClearSearch?.addEventListener('click', () => {
    if (globalSearch) globalSearch.value = '';
    searchDropdownEl?.classList.add('hidden');
    btnClearSearch?.classList.add('hidden');
    globalSearch?.focus();
  });

  // Close search dropdown on click outside or Escape
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#global-search') && !e.target.closest('#global-search-dropdown') && !e.target.closest('#btn-clear-global-search')) {
      searchDropdownEl?.classList.add('hidden');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchDropdownEl?.classList.add('hidden');
    }
  });

  /* ============================================================
   * 17. HƯỚNG DẪN SỬ DỤNG (USER GUIDE), CALENDAR TABS & TOOLTIP GỢI Ý (?)
   * ============================================================ */
  // --- BILINGUAL USER GUIDE RENDERER ---
  function renderUserGuide() {
    const guideGrid = document.getElementById('guide-modal-body-grid');
    const titleEl = document.getElementById('guide-modal-title');
    const subtitleEl = document.getElementById('guide-modal-subtitle');
    const proTipEl = document.getElementById('guide-modal-pro-tip');
    const understoodTextEl = document.getElementById('guide-btn-understood-text');

    const isEn = (currentLang === 'en');

    if (titleEl) {
      titleEl.textContent = isEn ? 'MyLife Productivity Handbook & User Guide' : 'Hướng Dẫn Sử Dụng & Mẹo Năng Suất MyLife';
    }
    if (subtitleEl) {
      subtitleEl.textContent = isEn ? 'Practical guide to optimize daily focus, financial control, and task workflows' : 'Cẩm nang nhanh giúp bạn làm chủ không gian làm việc và tối ưu hóa thời gian mỗi ngày';
    }
    if (proTipEl) {
      proTipEl.innerHTML = isEn
        ? '<b>Helpful Tip:</b> Whenever you see a question mark icon <i class="fa-regular fa-circle-question text-indigo-600"></i>, click it anytime to view quick operating hints for that specific card!'
        : '<b>Mẹo hữu ích:</b> Bất cứ thẻ nào có biểu tượng dấu chấm hỏi <i class="fa-regular fa-circle-question text-indigo-600"></i>, bạn chỉ cần bấm vào để xem gợi ý thao tác nhanh cho riêng mục đó!';
    }
    if (understoodTextEl) {
      understoodTextEl.textContent = isEn ? 'Understood, let\'s get started!' : 'Đã hiểu, bắt đầu dùng ngay!';
    }

    if (!guideGrid) return;

    if (isEn) {
      guideGrid.innerHTML = `
        <!-- Card 1: Personal Finance -->
        <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
          <div class="flex items-center gap-2 font-bold text-emerald-900 text-xs uppercase tracking-wide">
            <span class="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-[11px]"><i class="fa-solid fa-wallet"></i></span>
            1. Smart Personal Finance
          </div>
          <ul class="space-y-1.5 text-slate-700 pl-1">
            <li class="flex items-start gap-1.5">
              <span class="text-emerald-600 font-bold">•</span>
              <span><b>Fast Logging:</b> Record income and expenses with automatic dot-formatted amounts and custom spending categories.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-emerald-600 font-bold">•</span>
              <span><b>PIN Security Lock:</b> Blur and protect your sensitive account balance with your custom PIN whenever you are in public.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-emerald-600 font-bold">•</span>
              <span><b>12-Month Analytics:</b> Interactive category pie chart and annual monthly bar chart with AI cashflow health rating.</span>
            </li>
          </ul>
        </div>

        <!-- Card 2: Tasks & Schedule -->
        <div class="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
          <div class="flex items-center gap-2 font-bold text-blue-900 text-xs uppercase tracking-wide">
            <span class="w-6 h-6 rounded-lg bg-blue-500 text-white flex items-center justify-center text-[11px]"><i class="fa-solid fa-list-check"></i></span>
            2. Tasks & Schedule Center
          </div>
          <ul class="space-y-1.5 text-slate-700 pl-1">
            <li class="flex items-start gap-1.5">
              <span class="text-blue-600 font-bold">•</span>
              <span><b>Hourly Calendar:</b> Click any hourly block to schedule events and meetings with clean color-coded pastel badges.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-blue-600 font-bold">•</span>
              <span><b>2-Column Workflow:</b> Move tasks easily between "To-do" and "In Progress" with 1-click status transitions.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-blue-600 font-bold">•</span>
              <span><b>Subtasks & Deadlines:</b> Break complex goals into checklist steps and customize daily closing countdown timers.</span>
            </li>
          </ul>
        </div>

        <!-- Card 3: Pomodoro Deep Focus -->
        <div class="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-2">
          <div class="flex items-center gap-2 font-bold text-indigo-900 text-xs uppercase tracking-wide">
            <span class="w-6 h-6 rounded-lg bg-indigo-500 text-white flex items-center justify-center text-[11px]"><i class="fa-solid fa-stopwatch"></i></span>
            3. Pomodoro Focus Timer
          </div>
          <ul class="space-y-1.5 text-slate-700 pl-1">
            <li class="flex items-start gap-1.5">
              <span class="text-indigo-600 font-bold">•</span>
              <span><b>25/5 Standard Rhythm:</b> 25 minutes of deep distraction-free focus followed by a 5-minute restorative recharge.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-indigo-600 font-bold">•</span>
              <span><b>Gentle Audio Chime:</b> Automated audio notifications alert you seamlessly when each session concludes.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-indigo-600 font-bold">•</span>
              <span><b>Sustainable Stamina:</b> Avoid mental exhaustion and maintain consistent cognitive clarity throughout the day.</span>
            </li>
          </ul>
        </div>

        <!-- Card 4: Daily Digest & Customization -->
        <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
          <div class="flex items-center gap-2 font-bold text-amber-900 text-xs uppercase tracking-wide">
            <span class="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-[11px]"><i class="fa-solid fa-sliders"></i></span>
            4. Daily Digest & Preferences
          </div>
          <ul class="space-y-1.5 text-slate-700 pl-1">
            <li class="flex items-start gap-1.5">
              <span class="text-amber-600 font-bold">•</span>
              <span><b>Curated News:</b> Filter top stories by Tech & AI, Economy, and Lifestyle to match your personal interests.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-amber-600 font-bold">•</span>
              <span><b>Bilingual Toggle:</b> Switch instantly between English and Vietnamese at the top right of the navigation bar.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-amber-600 font-bold">•</span>
              <span><b>Board Management:</b> Start completely blank for your own planning or load sample demo cards anytime in Settings.</span>
            </li>
          </ul>
        </div>
      `;
    } else {
      guideGrid.innerHTML = `
        <!-- Card 1: Quản lý tài chính -->
        <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
          <div class="flex items-center gap-2 font-bold text-emerald-900 text-xs uppercase tracking-wide">
            <span class="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-[11px]"><i class="fa-solid fa-wallet"></i></span>
            1. Quản Lý Tài Chính Thông Minh
          </div>
          <ul class="space-y-1.5 text-slate-700 pl-1">
            <li class="flex items-start gap-1.5">
              <span class="text-emerald-600 font-bold">•</span>
              <span><b>Ghi chép siêu tốc:</b> Gõ số tiền tự động cách dấu chấm (VD: 1.500.000) và gắn danh mục thu/chi rõ ràng.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-emerald-600 font-bold">•</span>
              <span><b>Khóa bảo mật riêng tư:</b> Nhập mã PIN 4 số để ẩn mờ số dư nhạy cảm khi dùng thiết bị nơi đông người.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-emerald-600 font-bold">•</span>
              <span><b>Báo cáo 12 tháng:</b> Biểu đồ tròn cơ cấu danh mục và biểu đồ cột thu - chi cả năm kèm đánh giá dòng tiền tự động.</span>
            </li>
          </ul>
        </div>

        <!-- Card 2: Công việc & Lịch trình -->
        <div class="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
          <div class="flex items-center gap-2 font-bold text-blue-900 text-xs uppercase tracking-wide">
            <span class="w-6 h-6 rounded-lg bg-blue-500 text-white flex items-center justify-center text-[11px]"><i class="fa-solid fa-list-check"></i></span>
            2. Trung Tâm Công Việc & Lịch Biểu
          </div>
          <ul class="space-y-1.5 text-slate-700 pl-1">
            <li class="flex items-start gap-1.5">
              <span class="text-blue-600 font-bold">•</span>
              <span><b>Lập kế hoạch theo giờ:</b> Bấm trực tiếp vào các ô giờ trên bảng lịch tuần để tạo nhanh sự kiện hoặc buổi họp.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-blue-600 font-bold">•</span>
              <span><b>Luồng 2 cột chuẩn:</b> Phân loại rõ ràng giữa "Cần làm" và "Đang làm" với nút chuyển trạng thái 1 chạm mượt mà.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-blue-600 font-bold">•</span>
              <span><b>Checklist & Hạn chót ngày:</b> Tùy biến giờ chốt sổ trong ngày (VD: trước 22:00) và chia nhỏ nhiệm vụ thành các bước con.</span>
            </li>
          </ul>
        </div>

        <!-- Card 3: Pomodoro Focus -->
        <div class="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-2">
          <div class="flex items-center gap-2 font-bold text-indigo-900 text-xs uppercase tracking-wide">
            <span class="w-6 h-6 rounded-lg bg-indigo-500 text-white flex items-center justify-center text-[11px]"><i class="fa-solid fa-stopwatch"></i></span>
            3. Đồng Hồ Pomodoro Focus
          </div>
          <ul class="space-y-1.5 text-slate-700 pl-1">
            <li class="flex items-start gap-1.5">
              <span class="text-indigo-600 font-bold">•</span>
              <span><b>Chu kỳ 25/5 vàng:</b> 25 phút làm việc chuyên sâu không xao nhãng, sau đó nghỉ ngơi 5 phút để tái tạo năng lượng não bộ.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-indigo-600 font-bold">•</span>
              <span><b>Chuông báo êm dịu:</b> Tự động phát âm thanh thông báo nhẹ nhàng khi kết thúc phiên làm việc hay phiên giải lao.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-indigo-600 font-bold">•</span>
              <span><b>Duy trì năng suất:</b> Giúp chống trì hoãn, phòng ngừa kiệt sức và nâng cao chất lượng công việc dài hạn.</span>
            </li>
          </ul>
        </div>

        <!-- Card 4: Điểm tin & Cài đặt -->
        <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
          <div class="flex items-center gap-2 font-bold text-amber-900 text-xs uppercase tracking-wide">
            <span class="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-[11px]"><i class="fa-solid fa-sliders"></i></span>
            4. Điểm Tin Thời Sự & Tùy Biến
          </div>
          <ul class="space-y-1.5 text-slate-700 pl-1">
            <li class="flex items-start gap-1.5">
              <span class="text-amber-600 font-bold">•</span>
              <span><b>Tin tức theo sở thích:</b> Lọc nhanh các bản tin nóng về Công nghệ AI, Kinh tế, Thị trường hoặc Đời sống bạn quan tâm.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-amber-600 font-bold">•</span>
              <span><b>Đồng bộ song ngữ:</b> Chuyển đổi linh hoạt Tiếng Việt / Tiếng Anh ngay trên thanh điều hướng hoặc trong Cài đặt.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-amber-600 font-bold">•</span>
              <span><b>Làm sạch bảng biểu:</b> Tùy chọn để trắng toàn bộ lịch trình hoặc nạp lại dữ liệu mẫu pastel chuẩn bất cứ lúc nào.</span>
            </li>
          </ul>
        </div>
      `;
    }
  }

  // Modal Hướng dẫn sử dụng
  const modalGuide         = document.getElementById('modal-user-guide');
  const btnOpenGuide       = document.getElementById('btn-open-guide');
  const btnCloseGuide      = document.getElementById('btn-close-guide');
  const btnUnderstoodGuide = document.getElementById('btn-understood-guide');

  function openGuide() {
    renderUserGuide();
    modalGuide?.classList.remove('hidden');
  }
  function closeGuide() {
    modalGuide?.classList.add('hidden');
  }

  btnOpenGuide?.addEventListener('click', openGuide);
  btnCloseGuide?.addEventListener('click', closeGuide);
  btnUnderstoodGuide?.addEventListener('click', closeGuide);
  modalGuide?.addEventListener('click', e => {
    if (e.target === modalGuide) closeGuide();
  });

  // Popup Toast Mẹo & Hướng dẫn nhanh khi bấm icon (?)
  const hintToast         = document.getElementById('hint-toast');
  const hintToastText     = document.getElementById('hint-toast-text');
  const btnCloseHintToast = document.getElementById('btn-close-hint-toast');
  let hintTimeout         = null;

  function showHint(message) {
    if (!hintToast || !hintToastText) return;
    hintToastText.textContent = message;
    hintToast.classList.remove('hidden');
    if (hintTimeout) clearTimeout(hintTimeout);
    hintTimeout = setTimeout(() => {
      hintToast.classList.add('hidden');
    }, 6000);
  }

  // Comprehensive Helpful Hints Map
  const cardHintsMap = {
    finance: {
      vi: 'Quản lý số dư VND, phân loại thu chi và theo dõi báo cáo 12 tháng. Bấm biểu tượng "Khóa" ở góc trên để ẩn số dư bảo vệ riêng tư.',
      en: 'Manage VND balance, categorize cashflow, and review 12-month analytics. Click "Lock" to safeguard sensitive numbers in public.'
    },
    tasks: {
      vi: 'Kế hoạch theo 2 cột: Cần làm và Đang làm. Đặt hạn chót giờ chốt sổ ngày và bấm vào thẻ bất kỳ để mở checklist chi tiết.',
      en: 'Organize with 2 columns: To-do and In Progress. Set daily closing cutoff and click any card to inspect checklist steps.'
    },
    weather: {
      vi: 'Dự báo nhiệt độ, độ ẩm và chỉ số tia cực tím UV giúp bạn chủ động kế hoạch di chuyển và thể thao ngoài trời.',
      en: 'Live temperature, humidity, and UV index forecasting to plan your outdoor activities and commutes safely.'
    },
    health: {
      vi: 'Theo dõi mục tiêu 10,000 bước chân mỗi ngày, lượng nước uống và calo đốt cháy để duy trì thể lực tốt.',
      en: 'Track daily 10,000 steps goal, water intake, and calories burned to maintain physical vitality.'
    },
    news: {
      vi: 'Bản tin thời sự chắt lọc trong ngày. Bấm biểu tượng cài đặt (⚙) để chọn các mảng tin tức bạn quan tâm nhất.',
      en: 'Curated daily news brief. Click the sliders icon (⚙) to customize topics you care about most.'
    },
    pomo: {
      vi: 'Phương pháp Pomodoro: Làm việc sâu 25 phút và nghỉ ngơi 5 phút để tối đa hóa hiệu suất tinh thần bền bỉ.',
      en: 'Pomodoro technique: 25 minutes of deep focus followed by a 5-minute restorative recharge.'
    }
  };

  document.querySelectorAll('.btn-card-hint').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      let hintType = 'tasks';
      if (btn.closest('#view-overview')) {
        if (btn.closest('.lg\:col-span-8, [data-hint*="tiền"], [data-hint*="Dòng tiền"], [data-hint*="Tài chính"]')) {
          if (btn.closest('.lg\:col-span-8') && btn.closest('.relative') && btn.closest('.border-emerald-200\/50, .bg-emerald-50')) hintType = 'finance';
          else if (btn.closest('.lg\:col-span-4')) hintType = 'weather';
        }
      }
      // Infer from data-hint content if available
      const rawHint = (btn.dataset.hint || '').toLowerCase();
      if (rawHint.includes('dòng tiền') || rawHint.includes('tài chính') || rawHint.includes('mật khẩu')) hintType = 'finance';
      else if (rawHint.includes('nhiệt độ') || rawHint.includes('thời tiết') || rawHint.includes('uv')) hintType = 'weather';
      else if (rawHint.includes('bước') || rawHint.includes('sức khỏe') || rawHint.includes('calo')) hintType = 'health';
      else if (rawHint.includes('tin tức') || rawHint.includes('thời sự')) hintType = 'news';
      else if (rawHint.includes('pomodoro') || rawHint.includes('25 phút')) hintType = 'pomo';
      else hintType = 'tasks';

      const msg = cardHintsMap[hintType] ? cardHintsMap[hintType][currentLang] : (btn.dataset.hint || '');
      showHint(msg);
    });
  });

  btnCloseHintToast?.addEventListener('click', () => {
    if (hintTimeout) clearTimeout(hintTimeout);
    hintToast?.classList.add('hidden');
  });

  // ==================== BÁO CÁO TIẾN ĐỘ CÔNG VIỆC THỜI GIAN THỰC (REAL-TIME TASK PROGRESS REPORT) ====================
  const modalTaskReport     = document.getElementById('modal-task-progress-report');
  const btnCloseTaskReport  = document.getElementById('btn-close-task-report');
  const btnUnderstoodReport = document.getElementById('btn-understood-task-report');
  const taskReportTitle     = document.getElementById('task-report-modal-title');
  const taskReportSub       = document.getElementById('task-report-modal-subtitle');
  const taskReportBody      = document.getElementById('task-report-modal-body');
  const taskReportTime      = document.getElementById('task-report-timestamp');
  const taskReportBtnClose  = document.getElementById('task-report-btn-close-text');

  function renderTaskProgressReport() {
    if (!taskReportBody) return;
    const isEn = (currentLang === 'en');

    if (taskReportTitle) taskReportTitle.textContent = t('task_report_title');
    if (taskReportSub) taskReportSub.textContent = t('task_report_sub');
    if (taskReportBtnClose) taskReportBtnClose.textContent = t('report_btn_close');

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    const dateFormatted = isEn
      ? `${now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}`
      : `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
    if (taskReportTime) {
      taskReportTime.textContent = isEn ? `Generated at: ${timeStr} • ${dateFormatted}` : `Báo cáo thời gian thực lúc: ${timeStr} • ${dateFormatted}`;
    }

    const allTasks = tasks || [];
    const totalCount = allTasks.length;
    const doneTasks = allTasks.filter(t => t.status === 'done');
    const doingTasks = allTasks.filter(t => t.status === 'doing');
    const todoTasks = allTasks.filter(t => t.status === 'todo');

    const doneCount = doneTasks.length;
    const doingCount = doingTasks.length;
    const todoCount = todoTasks.length;
    const completionRate = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

    let html = `
      <!-- 4 THẺ KPI TIẾN ĐỘ -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
          <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">${t('report_total_tasks')}</p>
          <p class="text-2xl font-extrabold text-slate-900 mt-1">${totalCount}</p>
          <span class="text-[10px] text-slate-400">${isEn ? '100% Workload' : 'Tổng khối lượng'}</span>
        </div>
        <div class="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-center">
          <p class="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">${t('report_completed_tasks')}</p>
          <p class="text-2xl font-extrabold text-emerald-600 mt-1">${doneCount}</p>
          <span class="text-[10px] font-bold text-emerald-600">${completionRate}% ${isEn ? 'done' : 'hoàn thành'}</span>
        </div>
        <div class="p-3.5 rounded-2xl bg-blue-50 border border-blue-200/80 text-center">
          <p class="text-[11px] font-semibold text-blue-700 uppercase tracking-wider">${t('report_in_progress')}</p>
          <p class="text-2xl font-extrabold text-blue-600 mt-1">${doingCount}</p>
          <span class="text-[10px] text-blue-600">${isEn ? 'Active now' : 'Đang xử lý'}</span>
        </div>
        <div class="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-center">
          <p class="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">${t('report_todo')}</p>
          <p class="text-2xl font-extrabold text-amber-600 mt-1">${todoCount}</p>
          <span class="text-[10px] text-amber-600">${isEn ? 'Pending start' : 'Chờ bắt đầu'}</span>
        </div>
      </div>

      <!-- THANH TIẾN ĐỘ TỔNG THỂ -->
      <div class="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-soft">
        <div class="flex items-center justify-between text-xs mb-2">
          <span class="font-bold flex items-center gap-2 text-indigo-300">
            <i class="fa-solid fa-gauge-high"></i> ${t('report_progress_rate')}
          </span>
          <span class="font-extrabold text-emerald-400 text-sm">${completionRate}%</span>
        </div>
        <div class="w-full bg-white/10 rounded-full h-3 overflow-hidden p-0.5 border border-white/15">
          <div class="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 h-full rounded-full transition-all duration-700" style="width: ${completionRate}%"></div>
        </div>
        <p class="text-[11px] text-slate-300 mt-2 flex items-center justify-between">
          <span>${isEn ? `Completed ${doneCount} of ${totalCount} tasks` : `Đã hoàn tất ${doneCount}/${totalCount} nhiệm vụ`}</span>
          <span class="text-indigo-300">${isEn ? `${todoCount + doingCount} remaining` : `Còn lại ${todoCount + doingCount} việc`}</span>
        </p>
      </div>

      <!-- TIẾN ĐỘ THEO DỰ ÁN (PROJECT BREAKDOWN) -->
      <div class="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
        <h4 class="font-bold text-slate-900 text-xs flex items-center gap-2">
          <i class="fa-solid fa-folder-tree text-indigo-600"></i> ${t('report_project_breakdown')}
        </h4>
        <div class="space-y-2.5">
    `;

    (projects || []).forEach(p => {
      const pTasks = allTasks.filter(t => t.project === p.name);
      if (pTasks.length > 0) {
        const pDone = pTasks.filter(t => t.status === 'done').length;
        const pPct = Math.round((pDone / pTasks.length) * 100);
        html += `
          <div>
            <div class="flex items-center justify-between text-[11px] mb-1">
              <span class="font-bold text-slate-800 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-blue-500"></span> ${p.name}
              </span>
              <span class="text-slate-500 font-medium">${pDone}/${pTasks.length} ${isEn ? 'done' : 'xong'} (${pPct}%)</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div class="bg-blue-600 h-full rounded-full" style="width: ${pPct}%"></div>
            </div>
          </div>
        `;
      }
    });

    html += `
        </div>
      </div>

      <!-- CHI TIẾT CÁC CÔNG VIỆC ĐANG LÀM & ĐÃ XONG -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <!-- Cột Đang làm -->
        <div class="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
          <div class="flex items-center justify-between text-xs font-bold text-blue-900">
            <span class="flex items-center gap-1.5"><i class="fa-solid fa-spinner text-blue-600 fa-spin-pulse"></i> ${t('report_doing_tasks_title')}</span>
            <span class="px-2 py-0.5 rounded-full bg-blue-200/80 text-blue-800 text-[10px] font-extrabold">${doingCount}</span>
          </div>
          <div class="space-y-1.5 max-h-48 overflow-y-auto pr-1">
    `;

    if (doingTasks.length === 0) {
      html += `<p class="text-[11px] text-slate-400 italic py-2 text-center">${isEn ? 'No tasks in progress.' : 'Chưa có việc nào đang thực hiện.'}</p>`;
    } else {
      doingTasks.forEach(t => {
        const subDone = t.subtasks?.filter(s => s.completed)?.length || 0;
        const subTotal = t.subtasks?.length || 0;
        html += `
          <div class="p-2 rounded-xl bg-white border border-blue-200/70 text-xs">
            <p class="font-bold text-slate-800 line-clamp-1">${t.title}</p>
            <div class="flex items-center justify-between text-[10px] text-slate-400 mt-1">
              <span>📁 ${t.project}</span>
              ${subTotal > 0 ? `<span class="text-blue-600 font-semibold">${subDone}/${subTotal} ${isEn ? 'subtasks' : 'bước'}</span>` : ''}
            </div>
          </div>
        `;
      });
    }

    html += `
          </div>
        </div>

        <!-- Cột Đã xong -->
        <div class="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
          <div class="flex items-center justify-between text-xs font-bold text-emerald-900">
            <span class="flex items-center gap-1.5"><i class="fa-solid fa-circle-check text-emerald-600"></i> ${t('report_done_tasks_title')}</span>
            <span class="px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-800 text-[10px] font-extrabold">${doneCount}</span>
          </div>
          <div class="space-y-1.5 max-h-48 overflow-y-auto pr-1">
    `;

    if (doneTasks.length === 0) {
      html += `<p class="text-[11px] text-slate-400 italic py-2 text-center">${isEn ? 'No completed tasks yet.' : 'Chưa có việc nào hoàn thành.'}</p>`;
    } else {
      doneTasks.forEach(t => {
        html += `
          <div class="p-2 rounded-xl bg-white border border-emerald-200/70 text-xs flex items-center justify-between">
            <span class="font-medium text-slate-700 line-clamp-1"><i class="fa-solid fa-check text-emerald-500 mr-1.5 text-[10px]"></i>${t.title}</span>
            <span class="text-[10px] text-emerald-600 font-bold shrink-0 ml-1">${isEn ? 'Done' : 'Xong'}</span>
          </div>
        `;
      });
    }

    html += `
          </div>
        </div>

      </div>
    `;

    taskReportBody.innerHTML = html;
  }

  function openTaskProgressReportModal() {
    renderTaskProgressReport();
    modalTaskReport?.classList.remove('hidden');
  }

  function closeTaskProgressReportModal() {
    modalTaskReport?.classList.add('hidden');
  }

  btnCloseTaskReport?.addEventListener('click', closeTaskProgressReportModal);
  btnUnderstoodReport?.addEventListener('click', closeTaskProgressReportModal);
  modalTaskReport?.addEventListener('click', (e) => {
    if (e.target === modalTaskReport) closeTaskProgressReportModal();
  });

  // --- CALENDAR NAVIGATION TABS (CHỈ GIỮ LỊCH BIỂU VÀ BÁO CÁO TIẾN ĐỘ) ---
  document.querySelectorAll('.cal-nav-tab').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      const tab = tabBtn.dataset.tab;

      if (tab === 'task-report') {
        openTaskProgressReportModal();
        return;
      }

      // Tab Lịch biểu active
      document.querySelectorAll('.cal-nav-tab').forEach(t => {
        t.classList.remove('text-cyan-600', 'font-bold', 'border-b-2', 'border-cyan-500');
        t.classList.add('text-slate-500');
      });
      tabBtn.classList.remove('text-slate-500');
      tabBtn.classList.add('text-cyan-600', 'font-bold', 'border-b-2', 'border-cyan-500');

      const grid = document.getElementById('table-weekly-schedule');
      grid?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  document.getElementById('btn-open-task-progress-report')?.addEventListener('click', openTaskProgressReportModal);

  // ============================================================
  // 30. AI COPILOT CHATBOT CONTROLLER (GOOGLE GEMINI 1.5 FLASH + DUAL ENGINE)
  // ============================================================
  const aiDrawer           = document.getElementById('ai-copilot-drawer');
  const aiMiniBubble       = document.getElementById('ai-copilot-minimized-bubble');
  const aiMinimizeBtn      = document.getElementById('btn-ai-minimize-drawer');
  const aiCloseBtn         = document.getElementById('btn-ai-close-drawer');
  const aiNavChatBtn       = document.getElementById('btn-nav-ai-chat');
  const aiPillChatBtn      = document.getElementById('btn-ai-copilot-pill');
  const aiClearBtn         = document.getElementById('btn-ai-clear-chat');
  const aiOpenSettingsBtn  = document.getElementById('btn-ai-open-settings');
  const aiMessagesBox      = document.getElementById('ai-chat-messages');
  const aiChatForm         = document.getElementById('ai-chat-form');
  const aiChatInput        = document.getElementById('ai-chat-input');
  const aiSendBtn          = document.getElementById('btn-ai-send');
  const aiStatusIndicator  = document.getElementById('ai-status-indicator');
  const aiProviderBadge    = document.getElementById('ai-provider-badge');

  // Gemini Settings Elements
  const inputGeminiKey     = document.getElementById('input-gemini-api-key');
  const btnSaveGeminiKey   = document.getElementById('btn-save-gemini-key');
  const btnTestGeminiKey   = document.getElementById('btn-test-gemini-key');
  const btnToggleKeyVis    = document.getElementById('btn-toggle-gemini-key-vis');
  const geminiEyeIcon      = document.getElementById('gemini-key-eye');
  const geminiStatusBadge  = document.getElementById('gemini-status-badge');

  let geminiApiKey = localStorage.getItem('mylife_gemini_api_key') || '';
  let activeGeminiModel = localStorage.getItem('mylife_gemini_active_model') || 'gemini-3.8-flash';
  if (activeGeminiModel.includes('2.5-flash') || activeGeminiModel.includes('1.5-flash')) {
    activeGeminiModel = 'gemini-3.8-flash';
    localStorage.setItem('mylife_gemini_active_model', 'gemini-3.8-flash');
  }
  let chatConversation = []; // format: { role: 'user'|'model', text: string }

  // --- TỰ ĐỘNG PHÁT HIỆN MODEL GEMINI PHÙ HỢP VỚI API KEY ---
  async function resolveActiveGeminiModel(apiKey) {
    if (!apiKey) return activeGeminiModel;
    try {
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      if (resp.ok) {
        const data = await resp.json();
        const models = data.models || [];
        const genModels = models
          .filter(m => Array.isArray(m.supportedGenerationMethods) && m.supportedGenerationMethods.includes('generateContent'))
          .map(m => m.name.replace(/^models\//, '').replace(/[\u2013\u2014]/g, '-'));

        console.log('[Gemini Available Models for Key]', genModels);

        const candidates = [
          'gemini-3.8-flash',
          'gemini-3.6-flash',
          'gemini-3.5-flash-lite',
          'gemini-3.5-flash',
          'gemini-3.0-flash',
          'gemini-2.0-flash'
        ];

        for (const c of candidates) {
          if (genModels.includes(c)) {
            activeGeminiModel = c;
            localStorage.setItem('mylife_gemini_active_model', c);
            return c;
          }
        }

        const fallbackFlash = genModels.find(m => m.includes('3.8')) || genModels.find(m => m.includes('flash')) || genModels[0];
        if (fallbackFlash) {
          activeGeminiModel = fallbackFlash;
          localStorage.setItem('mylife_gemini_active_model', fallbackFlash);
          return fallbackFlash;
        }
      }
    } catch (err) {
      console.warn('[resolveActiveGeminiModel Warning]', err);
    }
    return activeGeminiModel;
  }

  // --- GEMINI KEY SETTINGS MANAGEMENT ---
  function updateGeminiSettingsUI() {
    if (inputGeminiKey) {
      inputGeminiKey.value = geminiApiKey;
    }
    if (geminiStatusBadge) {
      if (geminiApiKey) {
        geminiStatusBadge.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200';
        geminiStatusBadge.textContent = currentLang === 'en' ? '🟢 Key Connected' : '🟢 Đã kết nối Key';
      } else {
        geminiStatusBadge.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200';
        geminiStatusBadge.textContent = currentLang === 'en' ? 'No Key Added' : 'Chưa nhập Key';
      }
    }
    const modelLabel = document.getElementById('gemini-model-label');
    if (modelLabel) {
      modelLabel.textContent = `Model: ${activeGeminiModel}`;
    }
    if (aiStatusIndicator) {
      if (geminiApiKey) {
        aiStatusIndicator.textContent = currentLang === 'en' ? `Connected to ${activeGeminiModel}` : `Sẵn sàng với ${activeGeminiModel}`;
      } else {
        aiStatusIndicator.textContent = currentLang === 'en' ? 'Smart Intent Parser (Local mode)' : 'Trợ lý thông minh (Nội bộ)';
      }
    }
    if (aiProviderBadge) {
      aiProviderBadge.textContent = geminiApiKey ? activeGeminiModel.replace('gemini-', 'Gemini ') : 'Local AI';
    }
  }

  btnSaveGeminiKey?.addEventListener('click', async () => {
    const val = inputGeminiKey?.value.trim() || '';
    geminiApiKey = val;
    localStorage.setItem('mylife_gemini_api_key', val);
    if (val) {
      await resolveActiveGeminiModel(val);
    }
    updateGeminiSettingsUI();
    showHint(currentLang === 'en' ? 'Gemini API Key saved successfully!' : 'Đã lưu Gemini API Key thành công!');
  });

  btnToggleKeyVis?.addEventListener('click', () => {
    if (!inputGeminiKey) return;
    const isPass = inputGeminiKey.type === 'password';
    inputGeminiKey.type = isPass ? 'text' : 'password';
    if (geminiEyeIcon) {
      geminiEyeIcon.className = isPass ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
    }
  });

  btnTestGeminiKey?.addEventListener('click', async () => {
    const testKey = inputGeminiKey?.value.trim() || geminiApiKey;
    if (!testKey) {
      showHint(currentLang === 'en' ? 'Please paste your Gemini API Key first.' : 'Vui lòng dán Gemini API Key trước khi kiểm tra.');
      return;
    }
    btnTestGeminiKey.disabled = true;
    btnTestGeminiKey.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Testing...';
    try {
      // 1. Tự động truy vấn model chính xác mà Google cấp cho Key này
      let resolvedModel = await resolveActiveGeminiModel(testKey);

      // 2. Gọi thử generateContent với model đó
      let resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${resolvedModel}:generateContent?key=${testKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: 'Ping test connection. Respond with OK.' }] }]
        })
      });
      let data = await resp.json();

      // NẾU GOOGLE THÔNG BÁO LỖI KÈM GỢI Ý MODEL (Ví dụ: "Please update your code to use models/gemini-3.8-flash")
      if (!resp.ok && data.error?.message) {
        const errMsg = data.error.message;
        const matchRec = errMsg.match(/models\/(gemini-[\w.\u2013\u2014-]+)/);
        if (matchRec && matchRec[1]) {
          const suggested = matchRec[1].replace(/[\u2013\u2014]/g, '-');
          console.log('[Auto-switching to suggested model]', suggested);
          resolvedModel = suggested;
          resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${resolvedModel}:generateContent?key=${testKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: 'Ping test connection. Respond with OK.' }] }]
            })
          });
          data = await resp.json();
        }
      }

      // NẾU HẾT QUOTA (429), TỰ ĐỘNG THỬ CÁC MODEL KHÁC TRONG PROJECT CÓ QUOTA ĐỘC LẬP
      if (!resp.ok && (resp.status === 429 || data.error?.message?.includes('Quota exceeded') || data.error?.message?.includes('RESOURCE_EXHAUSTED'))) {
        const altModels = ['gemini-3.5-flash-lite', 'gemini-2.0-flash', 'gemini-1.5-flash-8b', 'gemini-2.0-flash-lite'];
        for (const alt of altModels) {
          if (alt === resolvedModel) continue;
          try {
            const altResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${alt}:generateContent?key=${testKey}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: 'Ping' }] }] })
            });
            const altData = await altResp.json();
            if (altResp.ok && altData.candidates?.length > 0) {
              resolvedModel = alt;
              resp = altResp;
              data = altData;
              break;
            }
          } catch(e) {}
        }
      }

      if (resp.ok && data.candidates && data.candidates.length > 0) {
        geminiApiKey = testKey;
        activeGeminiModel = resolvedModel;
        localStorage.setItem('mylife_gemini_api_key', testKey);
        localStorage.setItem('mylife_gemini_active_model', resolvedModel);
        updateGeminiSettingsUI();
        showHint(currentLang === 'en' 
          ? `🟢 Gemini API Key verified & connected! (${resolvedModel})` 
          : `🟢 Kết nối Google Gemini thành công! (${resolvedModel})`);
      } else if (resp.status === 429 || data.error?.message?.includes('Quota exceeded') || data.error?.message?.includes('RESOURCE_EXHAUSTED')) {
        // Key đúng nhưng Google Free Tier hết quota tạm thời trong ngày
        geminiApiKey = testKey;
        activeGeminiModel = resolvedModel;
        localStorage.setItem('mylife_gemini_api_key', testKey);
        localStorage.setItem('mylife_gemini_active_model', resolvedModel);
        updateGeminiSettingsUI();
        if (geminiStatusBadge) {
          geminiStatusBadge.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200';
          geminiStatusBadge.textContent = currentLang === 'en' ? '🟡 Free Quota Limit' : '🟡 Hết Quota Free ngày';
        }
        showHint(currentLang === 'en'
          ? '🟡 Key is valid, but Google Free Quota reached daily limit (~20 requests). Copilot will use smart local engine until Google resets!'
          : '🟡 Key hợp lệ nhưng Google đã chạm giới hạn Free trong ngày (~20 lượt). Copilot sẽ tự động chạy Động cơ Nội bộ siêu tốc để phục vụ bạn không gián đoạn!');
      } else {
        const errMsg = data.error?.message || 'Invalid API Key or model not supported';
        showHint((currentLang === 'en' ? '🔴 Connection failed: ' : '🔴 Kết nối thất bại: ') + errMsg);
      }
    } catch (err) {
      showHint((currentLang === 'en' ? '🔴 Network error: ' : '🔴 Lỗi mạng: ') + err.message);
    } finally {
      btnTestGeminiKey.disabled = false;
      btnTestGeminiKey.textContent = currentLang === 'en' ? 'Test Connection' : 'Kiểm tra kết nối';
    }
  });

  // --- APP ACTION BRIDGE (THỰC THI MỌI TÁC VỤ ỨNG DỤNG) ---
  function executeAppAction(actionName, params = {}) {
    console.log('[AI Copilot Action]', actionName, params);
    try {
      if (actionName === 'add_task') {
        const title = params.title || 'Nhiệm vụ mới';
        const project = params.project || (projects[0]?.name || 'Design System & UI');
        let dDay = 1;
        let dHour = '09:00';
        let deadline = params.deadline || '';

        // Xử lý chuẩn hóa scheduleHour đa dạng: nhận diện 20:00, 20h, 20h30, 8h tối, allday, v.v.
        if (params.scheduleHour) {
          dHour = normalizeScheduleHour(params.scheduleHour);
        }

        // Tự động nhận diện deadline nếu người dùng nói "hôm nay", "ngày mai"
        const now = new Date();
        if (!deadline || deadline === 'today' || deadline === 'hôm nay') {
          deadline = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
          dDay = now.getDay() === 0 ? 7 : now.getDay();
        } else if (deadline === 'tomorrow' || deadline === 'ngày mai') {
          const tmr = new Date(now.getTime() + 86400000);
          deadline = `${tmr.getFullYear()}-${String(tmr.getMonth() + 1).padStart(2, '0')}-${String(tmr.getDate()).padStart(2, '0')}`;
          dDay = tmr.getDay() === 0 ? 7 : tmr.getDay();
        } else {
          const parsed = new Date(deadline);
          if (!isNaN(parsed.getTime())) {
            dDay = parsed.getDay() === 0 ? 7 : parsed.getDay();
            deadline = `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`;
          }
        }

        const newTask = {
          id: Date.now() + Math.floor(Math.random() * 1000),
          title: title,
          description: params.description || '',
          project: project,
          priority: params.priority || 'medium',
          status: params.status === 'in_progress' ? 'in_progress' : (params.status === 'done' ? 'done' : 'todo'),
          deadline: deadline,
          scheduleDay: dDay,
          scheduleHour: dHour,
          pillColor: getPillColorFromProject(project),
          accentColor: getAccentColorFromProject(project),
          subtasks: [],
          completed: params.status === 'done'
        };

        tasks.push(newTask);

        // Tự động nhảy tuần lịch biểu tới tuần của nhiệm vụ vừa tạo để người dùng thấy ngay
        if (deadline) {
          const targetD = new Date(deadline);
          if (!isNaN(targetD.getTime())) {
            scheduleMonday = getMondayOfWeek(targetD);
            syncDatePickerValue();
          }
        }

        // Nếu khung giờ lên lịch vượt quá khung giờ hiện tại của bảng biểu (ví dụ 20:00, 21:00, 22:00), tự động mở rộng
        const hrNum = parseInt(dHour, 10);
        if (!isNaN(hrNum)) {
          if (hrNum >= 20 || hrNum < 7) {
            localStorage.setItem('mylife_cal_working_hours', '6-22');
            const selWorkingHours = document.getElementById('cal-working-hours');
            if (selWorkingHours) selWorkingHours.value = '6-22';
          }
        }

        saveTasks();
        if (typeof renderWeeklySchedule === 'function') renderWeeklySchedule();

        return {
          success: true,
          action: 'add_task',
          badgeText: currentLang === 'en' ? `Added Task: ${title}` : `Đã thêm việc: ${title}`,
          message: currentLang === 'en' 
            ? `Task "${title}" scheduled at ${dHour} on deadline ${deadline || 'Today'}.`
            : `Đã lên lịch việc "${title}" vào khung giờ ${dHour}, hạn chót ${deadline || 'Hôm nay'}.`
        };
      }

      if (actionName === 'add_transaction') {
        const title = params.title || 'Giao dịch';
        const amount = Math.abs(Math.round(Number(params.amount) || 0));
        const type = (params.type === 'income' || String(params.type).toLowerCase().includes('thu')) ? 'income' : 'expense';
        let category = params.category;
        if (!category) {
          const tLower = title.toLowerCase();
          if (type === 'income') {
            category = (tLower.includes('thưởng') || tLower.includes('bonus')) ? 'Thưởng' : 'Lương & Thưởng';
          } else {
            if (tLower.includes('ăn') || tLower.includes('uống') || tLower.includes('cf') || tLower.includes('cà phê') || tLower.includes('cơm') || tLower.includes('phở') || tLower.includes('bánh') || tLower.includes('trà sữa')) {
              category = 'Ăn uống';
            } else if (tLower.includes('xăng') || tLower.includes('grab') || tLower.includes('taxi') || tLower.includes('xe') || tLower.includes('be')) {
              category = 'Di chuyển';
            } else if (tLower.includes('mua') || tLower.includes('shopee') || tLower.includes('áo') || tLower.includes('quần') || tLower.includes('sách') || tLower.includes('lazada')) {
              category = 'Mua sắm';
            } else if (tLower.includes('điện') || tLower.includes('nước') || tLower.includes('nhà') || tLower.includes('mạng') || tLower.includes('wifi') || tLower.includes('phòng')) {
              category = 'Hóa đơn';
            } else if (tLower.includes('thuốc') || tLower.includes('khám') || tLower.includes('gym') || tLower.includes('viện')) {
              category = 'Sức khỏe';
            } else {
              category = 'Khác';
            }
          }
        }
        const now = new Date();

        const newTrx = {
          id: 'TRX-' + Date.now().toString(36).toUpperCase(),
          title: title,
          amount: amount,
          type: type,
          category: category,
          datetime: now.toISOString(),
          note: 'Tạo bởi MyLife AI Copilot'
        };

        transactions.unshift(newTrx);
        saveTrans();
        if (typeof renderAllFinanceViews === 'function') renderAllFinanceViews();
        if (typeof renderFinanceOverviewCard === 'function') renderFinanceOverviewCard();

        return {
          success: true,
          action: 'add_transaction',
          badgeText: currentLang === 'en' 
            ? `Recorded ${type}: ${amount.toLocaleString()} VND` 
            : `Đã ghi ${type === 'income' ? 'thu' : 'chi'}: ${amount.toLocaleString('vi-VN')} đ`,
          message: currentLang === 'en'
            ? `Recorded ${type} "${title}" of ${amount.toLocaleString()} VND in category "${category}".`
            : `Đã ghi chép ${type === 'income' ? 'khoản thu' : 'khoản chi'} "${title}" số tiền ${amount.toLocaleString('vi-VN')} VND vào danh mục "${category}".`
        };
      }

      if (actionName === 'delete_task') {
        const titleKw = (params.title || params.keyword || '').toLowerCase().trim();
        const schedHour = params.scheduleHour ? normalizeScheduleHour(params.scheduleHour) : null;
        const isDeleteAll = params.deleteAll === true || titleKw === 'all' || titleKw === 'tất cả' || titleKw === 'toàn bộ';
        
        let targetDeadline = '';
        const now = new Date();
        if (params.deadline === 'today' || params.deadline === 'hôm nay') {
          targetDeadline = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        } else if (params.deadline === 'tomorrow' || params.deadline === 'ngày mai') {
          const tmr = new Date(now.getTime() + 86400000);
          targetDeadline = `${tmr.getFullYear()}-${String(tmr.getMonth() + 1).padStart(2, '0')}-${String(tmr.getDate()).padStart(2, '0')}`;
        } else if (params.deadline) {
          const parsed = new Date(params.deadline);
          if (!isNaN(parsed.getTime())) {
            targetDeadline = `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`;
          }
        }

        let deletedTasks = [];

        if (isDeleteAll && !schedHour && !targetDeadline && !titleKw) {
          deletedTasks = [...tasks];
          tasks = [];
        } else {
          tasks = tasks.filter(t => {
            let match = true;
            if (schedHour && t.scheduleHour !== schedHour) match = false;
            if (targetDeadline && t.deadline !== targetDeadline) match = false;
            if (titleKw && !isDeleteAll) {
              const tTitle = (t.title || '').toLowerCase();
              const tDesc = (t.description || '').toLowerCase();
              if (!tTitle.includes(titleKw) && !tDesc.includes(titleKw)) match = false;
            }
            if (match) {
              deletedTasks.push(t);
              return false;
            }
            return true;
          });
        }

        if (deletedTasks.length === 0) {
          let reason = '';
          if (schedHour && targetDeadline) {
            reason = currentLang === 'en'
              ? `at ${schedHour} on date ${targetDeadline}`
              : `vào khung giờ ${schedHour} ngày ${targetDeadline}`;
          } else if (schedHour) {
            reason = currentLang === 'en' ? `at ${schedHour}` : `vào khung giờ ${schedHour}`;
          } else if (titleKw && !isDeleteAll) {
            reason = currentLang === 'en' ? `matching "${titleKw}"` : `chứa từ khóa "${titleKw}"`;
          } else {
            reason = currentLang === 'en' ? `matching request` : `theo yêu cầu`;
          }

          return {
            success: false,
            action: 'delete_task',
            badgeText: currentLang === 'en' ? 'Task Not Found' : 'Không tìm thấy việc',
            message: currentLang === 'en'
              ? `No tasks found ${reason} to delete.`
              : `Không tìm thấy công việc nào ${reason} để xóa.`
          };
        }

        saveTasks();
        if (typeof renderTasks === 'function') renderTasks();
        if (typeof renderWeeklySchedule === 'function') renderWeeklySchedule();
        if (typeof renderDeepTasksView === 'function') renderDeepTasksView();
        if (typeof renderSmartNotifications === 'function') renderSmartNotifications();

        const count = deletedTasks.length;
        const taskTitles = deletedTasks.slice(0, 3).map(t => `"${t.title}"`).join(', ') + (count > 3 ? ` và ${count - 3} việc khác` : '');

        let successMsg = '';
        if (schedHour && targetDeadline) {
          successMsg = currentLang === 'en'
            ? `Deleted ${count} task(s) at ${schedHour} on date ${targetDeadline} (${taskTitles}).`
            : `Đã xóa thành công ${count} công việc vào khung giờ ${schedHour} ngày ${targetDeadline} (${taskTitles}).`;
        } else if (schedHour) {
          successMsg = currentLang === 'en'
            ? `Deleted ${count} task(s) at ${schedHour} (${taskTitles}).`
            : `Đã xóa thành công ${count} công việc vào khung giờ ${schedHour} (${taskTitles}).`;
        } else if (isDeleteAll && !schedHour && !targetDeadline) {
          successMsg = currentLang === 'en'
            ? `Deleted all ${count} tasks from the system.`
            : `Đã xóa toàn bộ ${count} công việc khỏi hệ thống.`;
        } else {
          successMsg = currentLang === 'en'
            ? `Deleted ${count} task(s) (${taskTitles}).`
            : `Đã xóa thành công ${count} công việc (${taskTitles}).`;
        }

        return {
          success: true,
          action: 'delete_task',
          badgeText: currentLang === 'en' ? `Deleted ${count} Task(s)` : `Đã xóa ${count} việc`,
          message: successMsg
        };
      }

      if (actionName === 'delete_transaction') {
        const query = (params.title || params.query || '').toLowerCase().trim();
        const amount = Number(params.amount) || 0;
        const isLatest = params.latest === true || (!query && amount === 0);

        if (transactions.length === 0) {
          return {
            success: false,
            action: 'delete_transaction',
            badgeText: currentLang === 'en' ? 'No Transactions' : 'Không có giao dịch',
            message: currentLang === 'en' ? 'No transactions available to delete.' : 'Hiện tại chưa có giao dịch nào trong sổ để xóa.'
          };
        }

        let idx = -1;
        if (isLatest) {
          idx = 0;
        } else {
          idx = transactions.findIndex(t => {
            if (query && (t.title || '').toLowerCase().includes(query)) return true;
            if (amount > 0 && Math.abs(t.amount - amount) < 1) return true;
            return false;
          });
        }

        if (idx === -1) {
          return {
            success: false,
            action: 'delete_transaction',
            badgeText: currentLang === 'en' ? 'Transaction Not Found' : 'Không tìm thấy giao dịch',
            message: currentLang === 'en'
              ? `Could not find transaction matching "${query || amount.toLocaleString()}".`
              : `Không tìm thấy giao dịch nào phù hợp với "${query || amount.toLocaleString('vi-VN')} đ" để xóa.`
          };
        }

        const removed = transactions.splice(idx, 1)[0];
        saveTrans();
        if (typeof renderAllFinanceViews === 'function') renderAllFinanceViews();
        if (typeof renderFinanceOverviewCard === 'function') renderFinanceOverviewCard();

        return {
          success: true,
          action: 'delete_transaction',
          badgeText: currentLang === 'en' ? 'Transaction Deleted' : 'Đã xóa giao dịch',
          message: currentLang === 'en'
            ? `Deleted transaction "${removed.title}" (${removed.amount.toLocaleString()} VND).`
            : `Đã xóa thành công giao dịch "${removed.title}" (${removed.amount.toLocaleString('vi-VN')} VND).`
        };
      }

      if (actionName === 'search_task') {
        const q = (params.query || '').toLowerCase().trim();
        if (!q) {
          switchMainView('tasks');
          return {
            success: true,
            action: 'search_task',
            badgeText: currentLang === 'en' ? 'Switched to Tasks' : 'Xem danh sách việc',
            message: currentLang === 'en' ? 'Showing all tasks on the board.' : 'Hiển thị tất cả công việc trên bảng.'
          };
        }

        const matches = tasks.filter(t => {
          const title = (t.title || '').toLowerCase();
          const desc = (t.description || '').toLowerCase();
          const prj = (t.project || '').toLowerCase();
          return title.includes(q) || desc.includes(q) || prj.includes(q);
        });

        switchMainView('tasks');
        const filterInput = document.getElementById('task-filter-search');
        if (filterInput) {
          filterInput.value = q;
          filterInput.dispatchEvent(new Event('input', { bubbles: true }));
        }

        if (matches.length === 0) {
          return {
            success: true,
            action: 'search_task',
            badgeText: currentLang === 'en' ? 'No Results' : 'Không tìm thấy',
            message: currentLang === 'en'
              ? `No tasks found matching "${q}". You can create it by saying: "Add task: ${q}".`
              : `Không tìm thấy công việc nào chứa từ khóa "${q}". Bạn có thể thêm mới bằng cách bảo tôi: "Thêm việc: ${q}".`
          };
        }

        const list = matches.slice(0, 5).map(t => {
          const statusText = t.status === 'done' || t.completed ? '✅ Đã xong' : (t.status === 'in_progress' ? '⏳ Đang làm' : '📌 Cần làm');
          const time = t.scheduleHour || 'All day';
          const dl = t.deadline || 'Chưa có hạn';
          return `• **${t.title}** [${statusText}] - Giờ: \`${time}\` | Hạn: \`${dl}\``;
        }).join('\n');

        const extra = matches.length > 5 ? `\n\n*(và ${matches.length - 5} việc khác...)*` : '';

        return {
          success: true,
          action: 'search_task',
          badgeText: currentLang === 'en' ? `Found ${matches.length} Tasks` : `Tìm thấy ${matches.length} việc`,
          message: currentLang === 'en'
            ? `Found **${matches.length}** task(s) matching "${q}":\n\n${list}${extra}`
            : `Tìm thấy **${matches.length}** công việc phù hợp với từ khóa "${q}":\n\n${list}${extra}`
        };
      }

      if (actionName === 'complete_task') {
        const schedHour = params.scheduleHour ? normalizeScheduleHour(params.scheduleHour) : null;
        let kw = (params.keyword || '').toLowerCase().trim();
        kw = kw.replace(/^(cuộc\s*họp|họp|task|việc)\s*/i, '').trim();

        const candidates = tasks.filter(t => t.status !== 'done' && !t.completed);

        let target = null;
        if (schedHour && kw) {
          target = candidates.find(t => t.scheduleHour === schedHour && ((t.title || '').toLowerCase().includes(kw) || (t.description || '').toLowerCase().includes(kw)));
        }
        if (!target && schedHour) {
          target = candidates.find(t => t.scheduleHour === schedHour);
        }
        if (!target && kw) {
          target = candidates.find(t => (t.title || '').toLowerCase().includes(kw) || (t.description || '').toLowerCase().includes(kw));
        }

        if (!target) {
          const detail = schedHour ? `vào khung giờ ${schedHour}` : (kw ? `chứa từ khóa "${kw}"` : '');
          return {
            success: false,
            action: 'complete_task',
            badgeText: currentLang === 'en' ? 'Task Not Found' : 'Không tìm thấy việc',
            message: currentLang === 'en'
              ? `Could not find any pending task ${detail} to mark as completed.`
              : `Không tìm thấy công việc chưa xong nào ${detail} để đánh dấu hoàn thành.`
          };
        }

        target.status = 'done';
        target.completed = true;

        saveTasks();
        if (typeof renderTasks === 'function') renderTasks();
        if (typeof renderWeeklySchedule === 'function') renderWeeklySchedule();
        if (typeof renderDeepTasksView === 'function') renderDeepTasksView();
        if (typeof renderSmartNotifications === 'function') renderSmartNotifications();

        return {
          success: true,
          action: 'complete_task',
          badgeText: currentLang === 'en' ? `Completed: ${target.title}` : `Đã xong: ${target.title}`,
          message: currentLang === 'en'
            ? `🎉 Successfully marked task **"${target.title}"** (scheduled at ${target.scheduleHour || 'All day'}) as **Completed**!`
            : `🎉 Đã đánh dấu hoàn thành xuất sắc công việc **"${target.title}"** (khung giờ ${target.scheduleHour || 'Cả ngày'}). Tiến độ hôm nay đã được cập nhật!`
        };
      }

      if (actionName === 'get_schedule') {
        const schedHour = params.scheduleHour ? normalizeScheduleHour(params.scheduleHour) : null;
        const now = new Date();
        let targetDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        let dateLabel = currentLang === 'en' ? 'Today' : 'Hôm nay';
        if (params.day === 'tomorrow' || params.deadline === 'tomorrow') {
          const tmr = new Date(now.getTime() + 86400000);
          targetDate = `${tmr.getFullYear()}-${String(tmr.getMonth() + 1).padStart(2, '0')}-${String(tmr.getDate()).padStart(2, '0')}`;
          dateLabel = currentLang === 'en' ? 'Tomorrow' : 'Ngày mai';
        }

        let schedTasks = tasks.filter(t => {
          let match = true;
          if (t.deadline && t.deadline !== targetDate) match = false;
          if (schedHour && t.scheduleHour !== schedHour) match = false;
          return match;
        });

        if (schedTasks.length === 0) {
          const timeStr = schedHour ? ` vào lúc ${schedHour}` : '';
          return {
            success: true,
            action: 'get_schedule',
            badgeText: currentLang === 'en' ? 'No Tasks Scheduled' : 'Không có lịch hẹn',
            message: currentLang === 'en'
              ? `You have no scheduled tasks for ${dateLabel.toLowerCase()}${schedHour ? ' at ' + schedHour : ''}. Ask me anytime to schedule one!`
              : `${dateLabel}${timeStr} bạn hiện không có lịch hẹn hay nhiệm vụ nào trên bảng. Bạn có thể bảo tôi thêm mới bất kỳ lúc nào!`
          };
        }

        const items = schedTasks.map(t => {
          const st = t.status === 'done' || t.completed ? '✅ Đã xong' : (t.status === 'in_progress' ? '⏳ Đang làm' : '📌 Cần làm');
          return `• **${t.title}** [${st}] - Khung giờ: \`${t.scheduleHour || 'Cả ngày'}\` (Phân loại: *${t.project}*)`;
        }).join('\n');

        return {
          success: true,
          action: 'get_schedule',
          badgeText: currentLang === 'en' ? `${dateLabel} Schedule` : `Lịch trình ${dateLabel.toLowerCase()}`,
          message: currentLang === 'en'
            ? `📅 **Your Schedule for ${dateLabel}:**\n\n${items}`
            : `📅 **Lịch trình ${dateLabel.toLowerCase()} của bạn (${schedTasks.length} việc):**\n\n${items}`
        };
      }

      if (actionName === 'add_project') {
        const pName = (params.name || '').trim();
        if (!pName) {
          return { success: false, message: 'Tên phân loại không được để trống.' };
        }

        let existing = projects.find(p => p.name.toLowerCase() === pName.toLowerCase());
        if (existing) {
          return {
            success: true,
            action: 'add_project',
            badgeText: `Phân loại: ${existing.name}`,
            message: currentLang === 'en'
              ? `Category "${existing.name}" already exists and is ready to use.`
              : `Phân loại "${existing.name}" đã có sẵn trong danh sách và sẵn sàng sử dụng!`
          };
        }

        const colors = ['pink', 'sky', 'emerald', 'amber', 'purple', 'indigo', 'teal', 'rose'];
        const color = colors[projects.length % colors.length];
        const newProj = { id: 'proj-' + Date.now(), name: pName, color: color };
        projects.push(newProj);
        saveProjects();

        return {
          success: true,
          action: 'add_project',
          badgeText: currentLang === 'en' ? `Added Category: ${pName}` : `Đã thêm phân loại: ${pName}`,
          message: currentLang === 'en'
            ? `📁 Successfully created new category / project **"${pName}"**! You can now assign tasks to it.`
            : `📁 Đã tạo thành công phân loại / dự án mới **"${pName}"**! Phân loại này đã được cập nhật vào danh mục lựa chọn khi bạn tạo hoặc chỉnh sửa công việc.`
        };
      }

      if (actionName === 'open_notifications') {
        const dNoti = document.getElementById('dropdown-noti');
        if (dNoti) {
          dNoti.classList.remove('hidden');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (typeof renderSmartNotifications === 'function') {
          renderSmartNotifications();
        }

        const unreadCount = document.getElementById('noti-unread-count')?.textContent || '0';
        const notiItems = Array.from(document.querySelectorAll('#notification-items-list > div')).map(div => {
          const t = div.querySelector('.font-bold')?.textContent || '';
          const d = div.querySelector('.text-slate-500, .dark\\:text-slate-400')?.textContent || '';
          return t ? `• **${t}**: ${d}` : '';
        }).filter(Boolean);

        let msg = currentLang === 'en'
          ? `🔔 **Notification Center opened** (${unreadCount}).`
          : `🔔 **Đã mở Trung Tâm Thông Báo** (${unreadCount}).`;

        if (notiItems.length > 0) {
          msg += '\n\n' + (currentLang === 'en' ? 'Active Alerts:' : 'Thông báo hiện tại:') + '\n' + notiItems.slice(0, 4).join('\n');
        } else {
          msg += '\n\n' + (currentLang === 'en' ? 'Everything is running smoothly! No urgent alerts.' : 'Hiện tại mọi việc đều đúng tiến độ, không có cảnh báo khẩn cấp nào!');
        }

        return {
          success: true,
          action: 'open_notifications',
          badgeText: currentLang === 'en' ? 'Notification Center' : 'Trung Tâm Thông Báo',
          message: msg
        };
      }

      if (actionName === 'log_sleep') {
        let bedtime = params.bedtime || healthData.bedtime || '23:00';
        let wakeTime = params.wakeTime || healthData.wakeTime || '06:30';
        let hours = Number(params.hours) || 0;

        if (!hours && bedtime && wakeTime) {
          const [bH, bM] = bedtime.split(':').map(Number);
          const [wH, wM] = wakeTime.split(':').map(Number);
          let bMinutes = bH * 60 + (bM || 0);
          let wMinutes = wH * 60 + (wM || 0);
          if (wMinutes < bMinutes) {
            wMinutes += 24 * 60;
          }
          hours = Math.round(((wMinutes - bMinutes) / 60) * 10) / 10;
        }

        if (hours <= 0) hours = 7.5;

        const fullCycles = Math.floor(hours / 1.5);
        let qualityScore = 80;
        if (fullCycles >= 5) qualityScore = 95;
        else if (fullCycles === 4) qualityScore = 88;
        else if (fullCycles === 3) qualityScore = 78;
        else qualityScore = 65;

        healthData.bedtime = bedtime;
        healthData.wakeTime = wakeTime;
        healthData.sleepHours = hours;
        healthData.sleepQualityScore = qualityScore;
        saveHealthData();

        const hrsInt = Math.floor(hours);
        const minsInt = Math.round((hours % 1) * 60);
        const durStr = `${hrsInt}h ${minsInt > 0 ? minsInt + 'm' : '00m'}`;

        return {
          success: true,
          action: 'log_sleep',
          badgeText: currentLang === 'en' ? `Sleep Logged: ${durStr}` : `Đã ghi nhận ngủ: ${durStr}`,
          message: currentLang === 'en'
            ? `😴 **Sleep recorded:** ${bedtime} -> ${wakeTime} (Total: ${durStr}, ~${fullCycles} cycles of 90m, Sleep Score: ${qualityScore}/100).`
            : `😴 **Đã ghi nhận giấc ngủ:** Đi ngủ lúc ${bedtime}, thức dậy lúc ${wakeTime}. Tổng thời lượng: **${durStr}** (~${fullCycles} chu kỳ 90 phút, Điểm chất lượng: **${qualityScore}/100**).`
        };
      }

      if (actionName === 'set_health_goals') {
        const msgs = [];
        if (params.stepsTarget && Number(params.stepsTarget) > 0) {
          healthData.stepsTarget = Math.round(Number(params.stepsTarget));
          msgs.push(`Mục tiêu bước chân: ${healthData.stepsTarget.toLocaleString('vi-VN')} bước`);
        }
        if (params.waterTargetMl && Number(params.waterTargetMl) > 0) {
          healthData.waterTargetMl = Math.round(Number(params.waterTargetMl));
          msgs.push(`Mục tiêu nước: ${healthData.waterTargetMl} ml`);
        }
        if (params.sleepTargetHours && Number(params.sleepTargetHours) > 0) {
          healthData.sleepTargetHours = Number(params.sleepTargetHours);
          msgs.push(`Mục tiêu ngủ: ${healthData.sleepTargetHours} giờ/ngày`);
        }

        saveHealthData();
        return {
          success: true,
          action: 'set_health_goals',
          badgeText: currentLang === 'en' ? 'Health Goals Updated' : 'Đã cập nhật mục tiêu sức khỏe',
          message: currentLang === 'en'
            ? `🎯 Health targets updated:\n` + msgs.join('\n')
            : `🎯 **Đã cập nhật mục tiêu sức khỏe mới:**\n` + msgs.map(m => `• ${m}`).join('\n')
        };
      }

      if (actionName === 'get_health_status') {
        const nf = new Intl.NumberFormat(currentLang === 'en' ? 'en-US' : 'vi-VN');
        const cal = calcCalories(healthData.steps);
        const stepsPct = Math.min(100, Math.round((healthData.steps / healthData.stepsTarget) * 100));
        const waterPct = Math.min(100, Math.round((healthData.waterIntakeMl / healthData.waterTargetMl) * 100));
        const waterCups = Math.floor(healthData.waterIntakeMl / 250);
        const waterTargetCups = Math.ceil(healthData.waterTargetMl / 250);
        const sleepHrs = Math.floor(healthData.sleepHours);
        const sleepMins = Math.round((healthData.sleepHours % 1) * 60);

        const msg = currentLang === 'en'
          ? `📊 **Today's Health & Wellness Summary:**\n` +
            `• 🚶 **Steps:** ${nf.format(healthData.steps)} / ${nf.format(healthData.stepsTarget)} steps (${stepsPct}%) - Burned: **${nf.format(cal)} kcal**\n` +
            `• 💧 **Hydration:** ${(healthData.waterIntakeMl / 1000).toFixed(1)} / ${(healthData.waterTargetMl / 1000).toFixed(1)}L (${waterPct}%, ${waterCups}/${waterTargetCups} cups)\n` +
            `• 🌙 **Sleep:** ${sleepHrs}h ${sleepMins}m / ${healthData.sleepTargetHours}h (Score: ${healthData.sleepQualityScore}/100, Bedtime: ${healthData.bedtime} - Wake: ${healthData.wakeTime})`
          : `📊 **Tổng kết Chỉ Số Sức Khỏe & Thể Lực Hôm Nay:**\n` +
            `• 🚶 **Vận động:** **${nf.format(healthData.steps)}** / ${nf.format(healthData.stepsTarget)} bước (${stepsPct}%) - Tiêu hao: **${nf.format(cal)} kcal**\n` +
            `• 💧 **Uống nước:** **${(healthData.waterIntakeMl / 1000).toFixed(1)}** / ${(healthData.waterTargetMl / 1000).toFixed(1)}L (${waterPct}%, đã uống ${waterCups}/${waterTargetCups} ly)\n` +
            `• 🌙 **Giấc ngủ:** **${sleepHrs}h ${sleepMins > 0 ? sleepMins + 'm' : '00m'}** (Chất lượng: **${healthData.sleepQualityScore}/100**, Ngủ lúc ${healthData.bedtime} - Dậy lúc ${healthData.wakeTime})`;

        return {
          success: true,
          action: 'get_health_status',
          badgeText: currentLang === 'en' ? 'Health Summary' : 'Chỉ số Sức Khỏe',
          message: msg
        };
      }

      if (actionName === 'toggle_health_reminder') {
        const type = params.type || 'water';
        let enabled = params.enabled;
        if (type === 'sleep') {
          healthData.sleepReminderEnabled = enabled !== undefined ? !!enabled : !healthData.sleepReminderEnabled;
        } else {
          healthData.waterReminderEnabled = enabled !== undefined ? !!enabled : !healthData.waterReminderEnabled;
        }
        saveHealthData();
        const stateStr = (type === 'sleep' ? healthData.sleepReminderEnabled : healthData.waterReminderEnabled) ? 'Bật' : 'Tắt';
        const labelStr = type === 'sleep' ? 'nhắc nhở đi ngủ' : 'nhắc nhở uống nước';
        return {
          success: true,
          action: 'toggle_health_reminder',
          badgeText: `${stateStr} ${labelStr}`,
          message: `Đã **${stateStr.toLowerCase()}** tính năng ${labelStr}.`
        };
      }

      if (actionName === 'reset_health_today') {
        healthData.steps = 0;
        healthData.waterIntakeMl = 0;
        saveHealthData();
        return {
          success: true,
          action: 'reset_health_today',
          badgeText: currentLang === 'en' ? 'Health Reset' : 'Đã làm mới chỉ số',
          message: currentLang === 'en'
            ? 'Today steps and water intake have been reset to 0.'
            : 'Đã đặt lại số bước chân và lượng nước uống hôm nay về 0 để bạn bắt đầu ngày mới!'
        };
      }

      if (actionName === 'navigate_view') {
        let view = (params.view || '').toLowerCase().trim();
        if (view.includes('công việc') || view.includes('task') || view.includes('lịch') || view.includes('kanban')) {
          view = 'tasks';
        } else if (view.includes('tài chính') || view.includes('finance') || view.includes('thu chi')) {
          view = 'finance';
        } else if (view.includes('cài đặt') || view.includes('setting')) {
          view = 'settings';
        } else {
          view = 'overview';
        }

        switchMainView(view);
        const viewNames = {
          overview: currentLang === 'en' ? 'Overview' : 'Tổng quan',
          tasks: currentLang === 'en' ? 'Tasks & Schedule' : 'Công việc & Lịch biểu',
          finance: currentLang === 'en' ? 'Personal Finance' : 'Tài chính cá nhân',
          settings: currentLang === 'en' ? 'System Settings' : 'Cài đặt hệ thống'
        };

        return {
          success: true,
          action: 'navigate_view',
          badgeText: currentLang === 'en' ? `Switched to ${viewNames[view]}` : `Đã chuyển sang ${viewNames[view]}`,
          message: currentLang === 'en' ? `Switched view to ${viewNames[view]}.` : `Đã chuyển màn hình sang ${viewNames[view]}.`
        };
      }

      if (actionName === 'toggle_theme') {
        let mode = (params.mode || '').toLowerCase();
        if (!['light', 'dark', 'system'].includes(mode)) {
          mode = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        }
        applyTheme(mode);
        const modeLabel = mode === 'dark' ? 'Dark Mode (Tối)' : (mode === 'light' ? 'Light Mode (Sáng)' : 'System Mode');
        return {
          success: true,
          action: 'toggle_theme',
          badgeText: `Giao diện: ${modeLabel}`,
          message: currentLang === 'en' ? `Theme switched to ${modeLabel}.` : `Đã đổi giao diện sang ${modeLabel}.`
        };
      }

      if (actionName === 'toggle_language') {
        let lang = (params.lang || '').toLowerCase();
        if (lang.includes('en') || lang.includes('anh')) lang = 'en';
        else lang = 'vi';
        applyLanguage(lang);
        return {
          success: true,
          action: 'toggle_language',
          badgeText: lang === 'en' ? 'Language: English' : 'Ngôn ngữ: Tiếng Việt',
          message: lang === 'en' ? 'Language successfully switched to English.' : 'Đã đồng bộ ngôn ngữ sang Tiếng Việt.'
        };
      }

      if (actionName === 'clean_completed_tasks') {
        const prevCount = tasks.length;
        tasks = tasks.filter(t => t.status !== 'done' && !t.completed);
        const cleaned = prevCount - tasks.length;
        saveTasks();
        if (typeof renderWeeklySchedule === 'function') renderWeeklySchedule();

        return {
          success: true,
          action: 'clean_completed_tasks',
          badgeText: currentLang === 'en' ? `Cleaned ${cleaned} completed tasks` : `Đã dọn dẹp ${cleaned} việc đã xong`,
          message: currentLang === 'en' ? `Cleaned up ${cleaned} finished tasks from the board.` : `Đã dọn dẹp và làm sạch ${cleaned} công việc hoàn thành.`
        };
      }

      if (actionName === 'get_summary') {
        const total = tasks.length;
        const todo = tasks.filter(t => t.status === 'todo').length;
        const inProgress = tasks.filter(t => t.status === 'in_progress').length;
        const done = tasks.filter(t => t.status === 'done' || t.completed).length;

        const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + (t.amount || 0), 0);
        const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + (t.amount || 0), 0);
        const balance = totalIncome - totalExpense;

        const summaryText = currentLang === 'en'
          ? `Status Report:\n- Tasks: ${total} total (${todo} To-do, ${inProgress} In Progress, ${done} Done)\n- Finance: Balance ${balance.toLocaleString()} VND (Income: +${totalIncome.toLocaleString()} VND, Spent: -${totalExpense.toLocaleString()} VND).`
          : `Báo cáo trạng thái hiện tại:\n- Công việc: Tổng cộng ${total} việc (Cần làm: ${todo}, Đang làm: ${inProgress}, Đã xong: ${done})\n- Tài chính: Số dư ròng ${balance.toLocaleString('vi-VN')} đ (Thu: +${totalIncome.toLocaleString('vi-VN')} đ, Chi: -${totalExpense.toLocaleString('vi-VN')} đ).`;

        return {
          success: true,
          action: 'get_summary',
          badgeText: currentLang === 'en' ? 'Generated System Report' : 'Báo cáo tổng hợp',
          message: summaryText
        };
      }

      if (actionName === 'optimize_schedule') {
        const pendingTasks = tasks.filter(t => !t.completed && t.status !== 'done');
        const count = pendingTasks.length;
        const msg = currentLang === 'en'
          ? `💡 **Schedule & Productivity Optimization Strategy:**\n` +
            `• **Deep Work Block (09:00 - 11:30):** High cognitive focus for strategic tasks (${count} pending).\n` +
            `• **Meeting Consolidation:** Batch discussions and catch-ups into the afternoon (after 14:00).\n` +
            `• **Wellness Sync (50/10):** Rest your eyes and take 1 cup of water (250ml) every 50 minutes.`
          : `💡 **Chiến Lược Tối Ưu Lịch Làm Việc & Năng Suất:**\n` +
            `• **Khung giờ Deep Work (09:00 - 11:30):** Dành thời điểm năng lượng đỉnh cao nhất cho các việc quan trọng (hiện có **${count} việc cần hoàn thành**).\n` +
            `• **Gom cụm lịch hẹn:** Xếp các cuộc trao đổi hoặc họp ngắn vào buổi chiều (sau 14:00) để giữ sự tập trung liền mạch.\n` +
            `• **Nhịp phục hồi thông minh:** Sau mỗi 50 phút tập trung, đứng dậy vận động nhẹ và uống 1 ly nước (250ml).`;
        return {
          success: true,
          action: 'optimize_schedule',
          badgeText: currentLang === 'en' ? 'Schedule Optimized' : 'Tối ưu lịch trình',
          message: msg
        };
      }

      if (actionName === 'add_water') {
        const amount = Number(params.amount) || 250;
        addWater(amount);
        return {
          success: true,
          action: 'add_water',
          badgeText: currentLang === 'en' ? `+${amount}ml Water Logged` : `+${amount}ml Nước Đã Ghi`,
          message: currentLang === 'en'
            ? `Hydration recorded: +${amount}ml. Total today: ${healthData.waterIntakeMl}ml / ${healthData.waterTargetMl}ml.`
            : `Đã ghi nhận uống thêm ${amount}ml nước. Tổng lượng nước hôm nay: ${healthData.waterIntakeMl}ml / ${healthData.waterTargetMl}ml.`
        };
      }

      if (actionName === 'add_steps') {
        const amount = Number(params.amount) || 500;
        addSteps(amount);
        return {
          success: true,
          action: 'add_steps',
          badgeText: currentLang === 'en' ? `+${amount.toLocaleString()} Steps Logged` : `+${amount.toLocaleString()} Bước Đã Ghi`,
          message: currentLang === 'en'
            ? `Activity recorded: +${amount.toLocaleString()} steps. Total today: ${healthData.steps.toLocaleString()} steps (~${calcCalories(healthData.steps)} kcal).`
            : `Đã ghi nhận thêm ${amount.toLocaleString()} bước chân. Tổng vận động hôm nay: ${healthData.steps.toLocaleString()} bước (~${calcCalories(healthData.steps)} kcal).`
        };
      }

      if (actionName === 'get_capabilities') {
        const textVi = `Tôi là **MyLife AI Copilot**, trợ lý cá nhân thông minh trong ứng dụng của bạn! Tôi có thể giúp bạn:
- 📝 **Quản lý công việc**: Lên lịch hẹn, thêm việc mới vào cột Cần làm / Đang làm và hiển thị trên Lịch biểu tuần. (VD: *"Thêm việc lên lịch họp vào 20h"*).
- 💰 **Quản lý tài chính**: Ghi nhanh các khoản thu, chi tiêu, cập nhật số dư tức thì. (VD: *"Ghi chi 45k cà phê sáng"*).
- 🏃 **Theo dõi sức khỏe**: Ghi nhận số bước, thêm nước uống, theo dõi giấc ngủ. (VD: *"Uống 1 cốc nước"*, *"Thêm 1000 bước"*).
- 🧭 **Điều hướng nhanh**: Chuyển ngay màn hình Tổng quan, Sức khỏe, Công việc, Tài chính hoặc Cài đặt. (VD: *"Chuyển sang trang sức khỏe"*).
- 🌙 **Tùy chỉnh hệ thống**: Bật chế độ tối (Dark mode), chế độ sáng, chuyển ngôn ngữ Tiếng Việt / Tiếng Anh.
- 📊 **Báo cáo & Tổng hợp**: Thống kê số lượng việc cần làm, tiến độ hoàn thành và tình hình dòng tiền hôm nay. (VD: *"Báo cáo tiến độ hôm nay"*).
- 🌐 **Tra cứu thời gian thực**: Tìm kiếm trực tiếp giá vàng, thời tiết, tin tức mới nhất.`;

        const textEn = `I am **MyLife AI Copilot**, your personal productivity assistant! I can help you with:
- 📝 **Task Management**: Schedule meetings and add tasks into Kanban & Calendar grid. (e.g. *"Schedule meeting at 20:00"*).
- 💰 **Finance Tracking**: Log income and expenses with automatic category allocation. (e.g. *"Spend 50k on lunch"*).
- 🏃 **Health & Wellness**: Track daily steps, log hydration, and monitor sleep. (e.g. *"Drink 1 cup of water"*, *"Add 1000 steps"*).
- 🧭 **Quick Navigation**: Switch directly between Overview, Health, Tasks, Finance, and Settings.
- 🌙 **System Customization**: Toggle Dark / Light theme mode and switch display language.
- 📊 **Progress & Analytics**: Generate real-time reports of pending tasks and balance.
- 🌐 **Real-time Web Search**: Query live gold prices, weather, and breaking news.`;

        return {
          success: true,
          action: 'get_capabilities',
          badgeText: currentLang === 'en' ? 'AI Capabilities' : 'Khả năng hỗ trợ của Copilot',
          message: currentLang === 'en' ? textEn : textVi
        };
      }

      return { success: false, message: 'Action not recognized' };
    } catch (e) {
      console.error('[executeAppAction Error]', e);
      return { success: false, message: 'Error executing action: ' + e.message };
    }
  }

  // --- GEMINI TOOLS SCHEMAS (PHÂN TÁCH RÕ RÀNG ĐỂ TRÁNH LỖI KẾT HỢP TOOL) ---
  const geminiSearchTools = [
    {
      google_search: {}
    }
  ];

  const geminiAppTools = [
    {
      functionDeclarations: [
        {
          name: "add_task",
          description: "Tạo và thêm công việc hoặc lịch hẹn/sự kiện mới vào Kanban và Lịch biểu.",
          parameters: {
            type: "OBJECT",
            properties: {
              title: { type: "STRING", description: "Tên công việc hoặc sự kiện/lịch hẹn cần làm (VD: 'Lịch hẹn lúc 20:00', 'Họp team', 'Đi ăn tối')" },
              deadline: { type: "STRING", description: "Hạn chót ngày dạng YYYY-MM-DD hoặc 'today' / 'tomorrow'" },
              scheduleHour: { type: "STRING", description: "Khung giờ lên bảng biểu: chấp nhận mọi định dạng như '20:00', '20h', '20h30', '8h tối', '14h30', 'allday'" },
              priority: { type: "STRING", enum: ["high", "medium", "low"], description: "Mức độ ưu tiên" },
              status: { type: "STRING", enum: ["todo", "in_progress", "done"], description: "Trạng thái cột" }
            },
            required: ["title"]
          }
        },
        {
          name: "add_transaction",
          description: "Ghi chép một khoản thu nhập hoặc chi tiêu vào sổ tài chính.",
          parameters: {
            type: "OBJECT",
            properties: {
              title: { type: "STRING", description: "Nội dung khoản thu/chi (VD: 'Cà phê sáng', 'Ăn trưa', 'Lương')" },
              amount: { type: "NUMBER", description: "Số tiền VND (số nguyên dương ví dụ 50000, 10000000)" },
              type: { type: "STRING", enum: ["expense", "income"], description: "Phân loại thu/chi" },
              category: { type: "STRING", description: "Danh mục chi tiêu ví dụ: Ăn uống, Mua sắm, Di chuyển, Lương & Thưởng, Hóa đơn, Sức khỏe" }
            },
            required: ["title", "amount", "type"]
          }
        },
        {
          name: "add_water",
          description: "Ghi nhận lượng nước đã uống tính bằng ml.",
          parameters: {
            type: "OBJECT",
            properties: {
              amount: { type: "NUMBER", description: "Dung tích nước đã uống tính bằng ml (ví dụ 250, 500)" }
            },
            required: ["amount"]
          }
        },
        {
          name: "add_steps",
          description: "Ghi nhận số bước chân vận động hoặc chạy bộ trong ngày.",
          parameters: {
            type: "OBJECT",
            properties: {
              amount: { type: "NUMBER", description: "Số bước chân bổ sung (ví dụ 500, 1000, 2000)" }
            },
            required: ["amount"]
          }
        },
        {
          name: "navigate_view",
          description: "Chuyển màn hình giao diện ứng dụng.",
          parameters: {
            type: "OBJECT",
            properties: {
              view: { type: "STRING", enum: ["overview", "tasks", "finance", "health", "settings"], description: "Tên trang cần chuyển tới: 'overview', 'tasks', 'finance', 'health', 'settings'" }
            },
            required: ["view"]
          }
        },
        {
          name: "toggle_theme",
          description: "Đổi chế độ giao diện Sáng / Tối.",
          parameters: {
            type: "OBJECT",
            properties: {
              mode: { type: "STRING", enum: ["light", "dark", "system"], description: "Chế độ giao diện" }
            },
            required: ["mode"]
          }
        },
        {
          name: "toggle_language",
          description: "Thay đổi ngôn ngữ hiển thị hệ thống (Tiếng Việt hoặc Tiếng Anh).",
          parameters: {
            type: "OBJECT",
            properties: {
              lang: { type: "STRING", enum: ["vi", "en"], description: "Mã ngôn ngữ" }
            },
            required: ["lang"]
          }
        },
        {
          name: "get_summary",
          description: "Lấy thông tin tổng hợp tình trạng công việc và tài chính hiện tại.",
          parameters: {
            type: "OBJECT",
            properties: {}
          }
        },
        {
          name: "delete_task",
          description: "Xóa công việc hoặc lịch hẹn theo khung giờ, hạn chót ngày, từ khóa tên hoặc xóa tất cả.",
          parameters: {
            type: "OBJECT",
            properties: {
              title: { type: "STRING", description: "Từ khóa tên việc cần xóa (VD: 'nghiên cứu transformer', 'họp team', 'all')" },
              scheduleHour: { type: "STRING", description: "Khung giờ lên lịch cần xóa (VD: '06:00', '20:00', '14h30')" },
              deadline: { type: "STRING", description: "Ngày hạn chót cần xóa ('today', 'tomorrow' hoặc 'YYYY-MM-DD')" },
              deleteAll: { type: "BOOLEAN", description: "Đặt là true nếu muốn xóa tất cả công việc khớp điều kiện" }
            }
          }
        },
        {
          name: "delete_transaction",
          description: "Xóa một khoản giao dịch thu chi theo tên, số tiền hoặc giao dịch vừa tạo.",
          parameters: {
            type: "OBJECT",
            properties: {
              title: { type: "STRING", description: "Tên giao dịch cần xóa (VD: 'cà phê', 'tiền trọ')" },
              amount: { type: "NUMBER", description: "Số tiền cần xóa" },
              latest: { type: "BOOLEAN", description: "Đặt là true nếu muốn xóa giao dịch vừa tạo gần nhất" }
            }
          }
        },
        {
          name: "complete_task",
          description: "Đánh dấu hoàn thành một công việc hoặc lịch hẹn trên bảng (VD: 'đánh dấu cuộc họp lúc 20h đã hoàn thành', 'hoàn thành việc slide').",
          parameters: {
            type: "OBJECT",
            properties: {
              keyword: { type: "STRING", description: "Từ khóa tên việc cần đánh dấu hoàn thành (VD: 'cuộc họp', 'slide')" },
              scheduleHour: { type: "STRING", description: "Khung giờ lên lịch của việc (VD: '20:00', '15:00')" }
            }
          }
        },
        {
          name: "get_schedule",
          description: "Xem và kiểm tra lịch trình, các sự kiện hoặc nhiệm vụ theo ngày hoặc khung giờ (VD: 'lịch hôm nay có gì', 'xem lịch lúc 20h').",
          parameters: {
            type: "OBJECT",
            properties: {
              day: { type: "STRING", enum: ["today", "tomorrow"], description: "Ngày cần xem ('today' hoặc 'tomorrow')" },
              scheduleHour: { type: "STRING", description: "Khung giờ cụ thể cần kiểm tra (VD: '20:00')" }
            }
          }
        },
        {
          name: "add_project",
          description: "Tạo và thêm phân loại / dự án mới theo nhu cầu của người dùng (VD: 'thêm phân loại Nghiên cứu AI', 'tạo dự án Freelance').",
          parameters: {
            type: "OBJECT",
            properties: {
              name: { type: "STRING", description: "Tên phân loại hoặc dự án mới cần thêm" }
            },
            required: ["name"]
          }
        },
        {
          name: "search_task",
          description: "Tìm kiếm công việc và hiển thị kết quả trên bảng Kanban.",
          parameters: {
            type: "OBJECT",
            properties: {
              query: { type: "STRING", description: "Từ khóa công việc cần tìm kiếm (VD: 'nghiên cứu transformer', 'slide')" }
            },
            required: ["query"]
          }
        },
        {
          name: "open_notifications",
          description: "Mở Trung Tâm Thông Báo (chuông thông báo) để xem tất cả cảnh báo khẩn cấp, hạn chót và chi tiêu.",
          parameters: {
            type: "OBJECT",
            properties: {}
          }
        },
        {
          name: "log_sleep",
          description: "Ghi nhận nhịp sinh học và giấc ngủ (giờ đi ngủ, giờ thức dậy, số tiếng ngủ).",
          parameters: {
            type: "OBJECT",
            properties: {
              bedtime: { type: "STRING", description: "Giờ đi ngủ (VD: '22:30', '23:00')" },
              wakeTime: { type: "STRING", description: "Giờ thức dậy (VD: '06:00', '06:30')" },
              hours: { type: "NUMBER", description: "Tổng số giờ ngủ (VD: 7.5, 8.0)" }
            }
          }
        },
        {
          name: "set_health_goals",
          description: "Đặt và cập nhật mục tiêu sức khỏe: số bước chân, lượng nước (ml) hoặc số giờ ngủ.",
          parameters: {
            type: "OBJECT",
            properties: {
              stepsTarget: { type: "NUMBER", description: "Mục tiêu bước chân mỗi ngày (VD: 10000, 12000)" },
              waterTargetMl: { type: "NUMBER", description: "Mục tiêu nước mỗi ngày tính bằng ml (VD: 2000, 2500)" },
              sleepTargetHours: { type: "NUMBER", description: "Mục tiêu giờ ngủ mỗi ngày (VD: 8.0, 7.5)" }
            }
          }
        },
        {
          name: "get_health_status",
          description: "Lấy báo cáo và thống kê toàn diện về các chỉ số sức khỏe hôm nay: bước chân, calo, nước uống và giấc ngủ.",
          parameters: {
            type: "OBJECT",
            properties: {}
          }
        },
        {
          name: "toggle_health_reminder",
          description: "Bật hoặc tắt tính năng nhắc nhở uống nước hoặc nhắc nhở đi ngủ.",
          parameters: {
            type: "OBJECT",
            properties: {
              type: { type: "STRING", enum: ["water", "sleep"], description: "Loại nhắc nhở ('water' hoặc 'sleep')" },
              enabled: { type: "BOOLEAN", description: "Trạng thái bật (true) hoặc tắt (false)" }
            },
            required: ["type"]
          }
        },
        {
          name: "clean_completed_tasks",
          description: "Dọn dẹp và xóa tất cả các công việc đã hoàn thành.",
          parameters: {
            type: "OBJECT",
            properties: {}
          }
        }
      ]
    }
  ];

  // --- TIME NORMALIZER & TASK TITLE CLEANER FOR CHATBOT ---
  function normalizeScheduleHour(val) {
    if (!val) return '09:00';
    const s = String(val).trim().toLowerCase();
    if (s.includes('all') || s.includes('cả ngày')) return 'allday';

    // 1. Period matching: e.g. "8h tối", "8 giờ tối", "8pm", "2h chiều", "8h sáng", "10h sáng"
    const mPeriod = s.match(/(\d{1,2})(?:[:h](\d{2})?|\s*giờ(?:\s*(\d{1,2}))?)?\s*(sáng|trưa|chiều|tối|đêm|am|pm)/i);
    if (mPeriod) {
      let h = parseInt(mPeriod[1], 10);
      let m = parseInt(mPeriod[2] || mPeriod[3] || '0', 10);
      const p = mPeriod[4].toLowerCase();
      if ((p === 'tối' || p === 'đêm' || p === 'chiều' || p === 'pm') && h < 12) {
        h += 12;
      } else if ((p === 'sáng' || p === 'am') && h === 12) {
        h = 0;
      } else if (p === 'trưa' && h < 11) {
        h += 12;
      }
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    }

    // 2. Match "20:30", "20h30", "20h", "20:00"
    const mH = s.match(/(?:lúc|vào|đến)?\s*(\d{1,2})[:h](\d{2})?/i);
    if (mH) {
      const h = parseInt(mH[1], 10);
      const m = parseInt(mH[2] || '0', 10);
      if (h >= 0 && h <= 23 && m >= 0 && m <= 59) {
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      }
    }

    // 3. Match "20 giờ 30", "20 giờ"
    const mGio = s.match(/(?:lúc|vào)?\s*(\d{1,2})\s*giờ(?:\s*(\d{1,2}))?/i);
    if (mGio) {
      const h = parseInt(mGio[1], 10);
      const m = parseInt(mGio[2] || '0', 10);
      if (h >= 0 && h <= 23 && m >= 0 && m <= 59) {
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      }
    }

    // 4. Pure number e.g. "20", "8"
    const mNum = s.match(/\b(\d{1,2})\b/);
    if (mNum) {
      const h = parseInt(mNum[1], 10);
      if (h >= 0 && h <= 23) {
        return `${String(h).padStart(2, '0')}:00`;
      }
    }

    return '09:00';
  }

  function cleanTaskTitle(text, hour) {
    let s = text;
    // Strip command prefixes
    s = s.replace(/^(thêm việc|thêm nhiệm vụ|thêm task|tạo task|tạo việc|nhắc tôi|nhắc việc|nhắc nhở|nhắc|đặt hẹn|lên lịch hẹn|lên lịch|thêm lịch|đặt lịch|xếp lịch|lịch nộp|lịch|hẹn|add task)[:\s-]*/i, '');
    // Strip "mai có hẹn", "hôm nay có hẹn", "có hẹn"
    s = s.replace(/\b(có hẹn|có lịch|có cuộc họp)\b/gi, '');
    // Strip date keywords
    s = s.replace(/\b(hôm nay|ngày mai|ngày mốt|ngày kia|mai|chiều mai|sáng mai|tối mai)\b/gi, '');
    // Strip time expressions e.g. "lúc 20h", "lúc 8h tối", "10h sáng", "14h30", "15:00"
    s = s.replace(/(?:vào\s*lúc|lúc|vào|hồi|đúng)?\s*\d{1,2}(?:[:h]\d{2}|\s*giờ(?:\s*\d{1,2})?)?\s*(?:h|giờ)?\s*(?:sáng|trưa|chiều|tối|đêm|am|pm)?/gi, '');
    // Clean leftover prepositions and spaces
    s = s.replace(/^(vào|lúc|hồi|cho|về|để)\s+/i, '').trim();
    s = s.replace(/^[ :,\-]+|[ :,\-]+$/g, '').trim();
    s = s.replace(/\s+/g, ' ');
    if (!s) {
      return (text.includes('hẹn') || text.includes('lịch')) ? `Lịch hẹn lúc ${hour}` : `Công việc lúc ${hour}`;
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  // --- LOCAL SMART INTENT PARSER (DỰ PHÒNG SIÊU NHẠY & TOÀN DIỆN) ---
  function parseLocalIntent(userInput) {
    const text = userInput.toLowerCase().trim();

    // 0. Gợi ý Tối ưu lịch làm việc & năng suất
    if (text.includes('tối ưu') && (text.includes('lịch') || text.includes('việc') || text.includes('thời gian') || text.includes('năng suất') || text.includes('work'))) {
      return { action: 'optimize_schedule', params: {} };
    }

    // 0. Trợ giúp & Giới thiệu năng lực
    if (['giúp', 'làm được gì', 'bạn là ai', 'có thể làm gì', 'hướng dẫn', 'chức năng', 'what can you do', 'who are you', 'help'].some(k => text.includes(k))) {
      return { action: 'get_capabilities', params: {} };
    }

    // 0.1 MỞ TRUNG TÂM THÔNG BÁO (ƯU TIÊN TRƯỚC CÀI ĐẶT & CHUYỂN MÀN HÌNH)
    if (['thông báo', 'notification', 'chuông thông báo', 'alerts', 'hộp thư thông báo'].some(k => text.includes(k))) {
      if (['mở', 'xem', 'hiển thị', 'bật', 'kiểm tra', 'open', 'show', 'check'].some(k => text.includes(k)) || ['thông báo', 'thông báo chung', 'notifications'].includes(text)) {
        return { action: 'open_notifications', params: {} };
      }
    }

    // 0.2 XÓA / HỦY BỎ (TASK, GIAO DỊCH, LỊCH TRÌNH - ƯU TIÊN CAO NHẤT ĐỂ TRÁNH NHẦM THÀNH THÊM VIỆC)
    if (['xóa', 'xoá', 'hủy', 'huỷ', 'delete', 'remove', 'dọn'].some(k => text.includes(k))) {
      // A. Xóa việc đã xong / dọn dẹp
      if (['xong', 'hoàn thành', 'completed', 'done'].some(k => text.includes(k))) {
        return { action: 'clean_completed_tasks', params: {} };
      }

      // B. Xóa giao dịch tài chính
      if (['giao dịch', 'chi tiêu', 'khoản chi', 'khoản thu', 'thu chi', 'tiền'].some(k => text.includes(k))) {
        const mK = text.match(/(\d+(?:[.,]\d+)?)\s*(?:k|nghìn|ngàn|cành)\b/i);
        const mTr = text.match(/(?:(\d+(?:[.,]\d+)?)\s*(?:tr|triệu|củ)\b|(\d+(?:[.,]\d+)?)\s*m(?![a-z]))/i);
        const mNum = text.match(/(\d{1,3}(?:[.,]\d{3})+|\d{4,9})/i);
        let amt = 0;
        if (mK) amt = parseFloat(mK[1].replace(',', '.')) * 1000;
        else if (mTr) amt = parseFloat((mTr[1] || mTr[2]).replace(',', '.')) * 1000000;
        else if (mNum) amt = parseInt(mNum[1].replace(/[.,]/g, ''), 10);

        let q = text.replace(/^(xóa|xoá|hủy|huỷ|delete|remove)\s*(giao\s*dịch|khoản\s*chi|khoản\s*thu|mục)?\s*/i, '');
        q = q.replace(/\b(\d+(?:[.,]\d+)?\s*(?:k|nghìn|ngàn|cành|tr|triệu|củ|m|đ|vnd|đồng)?)\b/gi, '').trim();

        return {
          action: 'delete_transaction',
          params: {
            title: q,
            amount: amt,
            latest: text.includes('vừa') || text.includes('gần nhất') || text.includes('mới nhất')
          }
        };
      }

      // C. Xóa công việc / sự kiện / lịch hẹn
      const hasHour = /(?:lúc|vào|hồi)?\s*(\d{1,2}[:h](\d{2})?|\d{1,2}\s*giờ)/i.test(text);
      let schedHour = hasHour ? normalizeScheduleHour(text) : null;
      let deadline = '';
      if (text.includes('mai') || text.includes('tomorrow')) {
        deadline = 'tomorrow';
      } else if (text.includes('hôm nay') || text.includes('today')) {
        deadline = 'today';
      }

      const isDeleteAll = ['tất cả', 'toàn bộ', 'hết', 'all'].some(k => text.includes(k));

      let kw = text.replace(/^(xóa|xoá|hủy|huỷ|delete|remove)\s*(tất cả|toàn bộ|hết)?\s*(công\s*việc|nhiệm\s*vụ|task|việc|lịch\s*hẹn|lịch)?\s*/i, '');
      kw = kw.replace(/\b(hôm nay|ngày mai|ngày mốt|mai|sáng mai|chiều mai|tối mai)\b/gi, '');
      kw = kw.replace(/(?:vào\s*lúc|lúc|vào|hồi|đúng)?\s*\d{1,2}(?:[:h]\d{2}|\s*giờ(?:\s*\d{1,2})?)?\s*(?:h|giờ)?\s*(?:sáng|trưa|chiều|tối|đêm|am|pm)?/gi, '');
      kw = kw.replace(/^[ :,\-]+|[ :,\-]+$/g, '').trim();
      if (schedHour && (kw.length <= 2 || kw === 'h')) kw = '';

      return {
        action: 'delete_task',
        params: {
          keyword: kw,
          scheduleHour: schedHour,
          deadline: deadline,
          deleteAll: isDeleteAll
        }
      };
    }

    // 0.3 ĐÁNH DẤU HOÀN THÀNH CÔNG VIỆC / LỊCH HẸN (ƯU TIÊN CAO TRƯỚC THÊM VIỆC)
    // Xử lý các câu như: "đánh dấu cuộc họp lúc 20h đã hoàn thành", "hoàn thành cuộc họp lúc 20h", "đã xong việc làm slide"
    const isMarkDone = (
      text.startsWith('đánh dấu') ||
      text.startsWith('hoàn thành') ||
      text.startsWith('đã xong') ||
      text.startsWith('đã hoàn thành') ||
      text.startsWith('xong việc') ||
      text.startsWith('tích xong') ||
      text.startsWith('check done') ||
      (text.includes('đánh dấu') && (text.includes('xong') || text.includes('hoàn thành'))) ||
      ((text.includes('đã hoàn thành') || text.includes('đã xong')) && !text.includes('xóa') && !text.includes('dọn'))
    );

    if (isMarkDone) {
      const hasHour = /(?:lúc|vào|hồi)?\s*(\d{1,2}[:h](\d{2})?|\d{1,2}\s*giờ)/i.test(text);
      const schedHour = hasHour ? normalizeScheduleHour(text) : null;

      let kw = text;
      kw = kw.replace(/^(đánh\s*dấu\s*(là)?|tích\s*(xong)?|xác\s*nhận|check)?\s*/i, '');
      kw = kw.replace(/(?:đã\s*)?(?:hoàn\s*thành|xong\s*rồi|xong|done|hoàn\s*tất)/gi, '');
      kw = kw.replace(/^(công\s*việc|nhiệm\s*vụ|task|việc|cuộc\s*họp|lịch\s*hẹn|lịch)\s*/i, '');
      kw = kw.replace(/(?:vào\s*lúc|lúc|vào|hồi|đúng)?\s*\d{1,2}(?:[:h]\d{2}|\s*giờ(?:\s*\d{1,2})?)?\s*(?:h|giờ)?\s*(?:sáng|trưa|chiều|tối|đêm|am|pm)?/gi, '');
      kw = kw.replace(/\b(hôm nay|ngày mai|hôm qua)\b/gi, '');
      kw = kw.replace(/^[ :,\-]+|[ :,\-]+$/g, '').trim();

      return {
        action: 'complete_task',
        params: {
          keyword: kw,
          scheduleHour: schedHour
        }
      };
    }

    // 0.4 TỰ THÊM / TẠO PHÂN LOẠI & DỰ ÁN MỚI
    // VD: "thêm phân loại Nghiên cứu AI", "tạo phân loại Freelance", "thêm dự án Startup"
    if (/(?:thêm|tạo|mới)\s*(?:dự\s*án|phân\s*loại|danh\s*mục)\b/i.test(text)) {
      let pName = userInput.replace(/^(thêm|tạo|mới)\s*(dự\s*án|phân\s*loại|danh\s*mục|category|project)?\s*(mới)?[:\s-]*/i, '');
      pName = pName.replace(/^[ :,\-]+|[ :,\-]+$/g, '').trim();
      if (pName) {
        return {
          action: 'add_project',
          params: { name: pName }
        };
      }
    }

    // 0.5 TÌM KIẾM CÔNG VIỆC / TASK (ƯU TIÊN CAO TRÁNH NHẦM THÀNH THÊM VIỆC)
    const isSearchTask = ['tìm kiếm', 'tìm việc', 'tìm task', 'tra cứu task', 'tra cứu việc', 'search task'].some(k => text.includes(k)) ||
      (text.startsWith('tìm') && !text.includes('giá vàng') && !text.includes('thời tiết') && !text.includes('tin tức'));
    if (isSearchTask) {
      let q = text.replace(/^(tìm\s*kiếm|tìm|tra\s*cứu|search)\s*(công\s*việc|nhiệm\s*vụ|task|việc)?\s*(về|cho)?\s*/i, '').trim();
      q = q.replace(/^[ :,\-]+|[ :,\-]+$/g, '').trim();
      return {
        action: 'search_task',
        params: { query: q }
      };
    }

    // 0.6 XEM / TRA CỨU LỊCH TRÌNH (KHÔNG PHẢI THÊM LỊCH)
    // VD: "lịch hôm nay có gì", "lịch hôm nay thế nào", "xem lịch lúc 20h", "hôm nay có lịch gì không"
    const isCheckSchedule = (
      text.includes('lịch hôm nay') ||
      text.includes('lịch ngày mai') ||
      text.includes('lịch trình') ||
      text.includes('xem lịch') ||
      text.includes('kiểm tra lịch') ||
      (text.includes('lịch') && (text.includes('có gì') || text.includes('thế nào') || text.includes('không') || text.includes('chưa') || text.includes('mấy giờ'))) ||
      (text.includes('hôm nay') && (text.includes('có việc gì') || text.includes('có hẹn gì') || text.includes('có cuộc họp nào')))
    );

    if (isCheckSchedule && !text.startsWith('thêm') && !text.startsWith('tạo') && !text.startsWith('lên lịch') && !text.startsWith('đặt')) {
      const hasHour = /(?:lúc|vào|hồi)?\s*(\d{1,2}[:h](\d{2})?|\d{1,2}\s*giờ)/i.test(text);
      const schedHour = hasHour ? normalizeScheduleHour(text) : null;
      let day = 'today';
      if (text.includes('mai')) day = 'tomorrow';
      return {
        action: 'get_schedule',
        params: { day: day, scheduleHour: schedHour }
      };
    }

    // 1. Điều hướng màn hình
    if (['sức khỏe', 'thể lực', 'health', 'thể chất'].some(k => text.includes(k))) {
      if (['vào', 'chuyển', 'mở', 'xem', 'sang', 'go to', 'trang', 'màn hình'].some(k => text.includes(k)) || ['sức khỏe', 'health', 'thể lực'].includes(text)) {
        return { action: 'navigate_view', params: { view: 'health' } };
      }
    }

    if (['tài chính', 'finance', 'ví tiền', 'ví', 'thu chi', 'sổ tiền'].some(k => text.includes(k))) {
      if (['vào', 'chuyển', 'mở', 'xem', 'sang', 'go to', 'trang', 'màn hình'].some(k => text.includes(k)) || ['tài chính', 'finance', 'ví tiền'].includes(text)) {
        return { action: 'navigate_view', params: { view: 'finance' } };
      }
    }

    if (['công việc', 'lịch biểu', 'kanban', 'schedule', 'bảng việc', 'tasks', 'lịch tuần', 'lịch'].some(k => text.includes(k))) {
      if (['vào', 'chuyển', 'mở', 'xem', 'sang', 'go to', 'trang', 'màn hình'].some(k => text.includes(k)) || ['công việc', 'tasks', 'lịch biểu', 'lịch'].includes(text)) {
        return { action: 'navigate_view', params: { view: 'tasks' } };
      }
    }

    if (['tổng quan', 'overview', 'trang chủ', 'màn hình chính', 'home'].some(k => text.includes(k))) {
      if (['vào', 'chuyển', 'mở', 'xem', 'sang', 'về', 'go to'].some(k => text.includes(k)) || ['tổng quan', 'overview', 'home', 'trang chủ'].includes(text)) {
        return { action: 'navigate_view', params: { view: 'overview' } };
      }
    }

    if (['cài đặt', 'settings', 'cấu hình', 'tùy biến'].some(k => text.includes(k))) {
      if (['vào', 'chuyển', 'mở', 'xem', 'sang', 'go to'].some(k => text.includes(k)) || ['cài đặt', 'settings'].includes(text)) {
        return { action: 'navigate_view', params: { view: 'settings' } };
      }
    }

    // 2. Đổi giao diện
    if (['tắt dark mode', 'tắt chế độ tối', 'tắt nền tối', 'bật light mode', 'bật chế độ sáng', 'giao diện sáng', 'màu sáng'].some(k => text.includes(k))) {
      return { action: 'toggle_theme', params: { mode: 'light' } };
    }
    if (['tắt light mode', 'tắt chế độ sáng', 'bật dark mode', 'bật chế độ tối', 'giao diện tối', 'màu tối', 'dark mode'].some(k => text.includes(k))) {
      return { action: 'toggle_theme', params: { mode: 'dark' } };
    }

    // 3. Đổi ngôn ngữ
    if (['tiếng anh', 'english', 'en'].some(k => text.includes(k))) {
      if (['đổi', 'chuyển', 'sang', 'set', 'ngôn ngữ'].some(k => text.includes(k))) {
        return { action: 'toggle_language', params: { lang: 'en' } };
      }
    }
    if (['tiếng việt', 'vietnamese', 'vi'].some(k => text.includes(k))) {
      if (['đổi', 'chuyển', 'sang', 'set', 'ngôn ngữ'].some(k => text.includes(k))) {
        return { action: 'toggle_language', params: { lang: 'vi' } };
      }
    }

    // 4. SỨC KHỎE TOÀN DIỆN (HEALTH COPILOT: GIẤC NGỦ, MỤC TIÊU, NHẮC NHỞ, THỐNG KÊ)
    // 4.1 Thống kê chỉ số sức khỏe & Phân tích sức khỏe
    if (['chỉ số sức khỏe', 'tình hình sức khỏe', 'sức khỏe hôm nay', 'thống kê sức khỏe', 'báo cáo sức khỏe', 'phân tích sức khỏe', 'tư vấn sức khỏe'].some(k => text.includes(k)) ||
        (text.includes('bao nhiêu bước') || text.includes('bao nhiêu nước') || text.includes('uống bao nhiêu') || text.includes('ngủ bao lâu'))) {
      return { action: 'get_health_status', params: {} };
    }

    // 4.2 Ghi nhận giấc ngủ (VD: "ngủ 23h dậy 6h", "ngủ lúc 23:00 dậy 06:30", "ngủ 8 tiếng", "ngủ 7.5 tiếng")
    if (text.includes('ngủ') && !text.includes('nhắc')) {
      const mBedWake = text.match(/(?:ngủ\s*(?:lúc)?\s*)(\d{1,2}(?:[:h]\d{2})?)\s*(?:.*?(?:dậy|thức\s*dậy)\s*(?:lúc)?\s*)(\d{1,2}(?:[:h]\d{2})?)/i);
      if (mBedWake) {
        const bHour = normalizeScheduleHour(mBedWake[1]);
        const wHour = normalizeScheduleHour(mBedWake[2]);
        return {
          action: 'log_sleep',
          params: { bedtime: bHour, wakeTime: wHour }
        };
      }
      const mHours = text.match(/ngủ\s*(\d+(?:[.,]\d+)?)\s*(?:tiếng|giờ|h)/i);
      if (mHours) {
        const hrs = parseFloat(mHours[1].replace(',', '.'));
        return {
          action: 'log_sleep',
          params: { hours: hrs }
        };
      }
    }

    // 4.3 Đặt mục tiêu sức khỏe (VD: "đặt mục tiêu 12000 bước", "mục tiêu nước 2500ml", "mục tiêu ngủ 8 tiếng")
    if (text.includes('mục tiêu') && (text.includes('bước') || text.includes('nước') || text.includes('ngủ') || text.includes('calo') || text.includes('health'))) {
      const params = {};
      const mSteps = text.match(/(\d+(?:[.,]\d+)?)\s*(?:k\s*)?(?:bước|step)/i);
      if (mSteps) {
        let st = parseFloat(mSteps[1].replace(',', '.'));
        if (text.includes('k')) st *= 1000;
        params.stepsTarget = Math.round(st);
      }
      const mMl = text.match(/(\d+)\s*ml/i);
      const mLit = text.match(/(\d+(?:[.,]\d+)?)\s*(?:l|lít)/i);
      if (mMl) {
        params.waterTargetMl = parseInt(mMl[1], 10);
      } else if (mLit) {
        params.waterTargetMl = Math.round(parseFloat(mLit[1].replace(',', '.')) * 1000);
      }
      const mSleep = text.match(/(\d+(?:[.,]\d+)?)\s*(?:tiếng|giờ|h)\s*(?:ngủ)?/i);
      if (mSleep && text.includes('ngủ')) {
        params.sleepTargetHours = parseFloat(mSleep[1].replace(',', '.'));
      }
      if (Object.keys(params).length > 0) {
        return { action: 'set_health_goals', params };
      }
    }

    // 4.4 Bật / tắt nhắc nhở sức khỏe (VD: "bật nhắc uống nước", "tắt nhắc đi ngủ")
    if (text.includes('nhắc') && (text.includes('nước') || text.includes('ngủ'))) {
      const isSleep = text.includes('ngủ');
      const isEnable = !text.includes('tắt') && !text.includes('hủy') && !text.includes('bỏ');
      return {
        action: 'toggle_health_reminder',
        params: { type: isSleep ? 'sleep' : 'water', enabled: isEnable }
      };
    }

    // 4.5 Reset chỉ số hôm nay
    if (['reset sức khỏe', 'đặt lại sức khỏe', 'làm mới sức khỏe', 'reset nước', 'reset bước chân'].some(k => text.includes(k))) {
      return { action: 'reset_health_today', params: {} };
    }

    // 4.6 Ghi nhận uống nước
    if (['uống nước', 'cốc nước', 'ly nước', 'uống 1 cốc', 'uống 1 ly', 'drink water', 'thêm nước', 'vừa uống', 'ml nước', 'nước uống', 'uống thêm'].some(k => text.includes(k))) {
      const mMl = text.match(/(\d+)\s*ml/i);
      if (mMl) {
        return { action: 'add_water', params: { amount: parseInt(mMl[1], 10) } };
      }
      const mCup = text.match(/(\d+)\s*(?:cốc|ly|cup)/i);
      if (mCup) {
        return { action: 'add_water', params: { amount: parseInt(mCup[1], 10) * 250 } };
      }
      return { action: 'add_water', params: { amount: 250 } };
    }

    // 4.7 Vận động / Bước chân / Chạy bộ
    if (['bước', 'đi bộ', 'chạy bộ', 'bước chân', 'step', 'đi dạo'].some(k => text.includes(k))) {
      const mK = text.match(/(\d+(?:[.,]\d+)?)\s*k\s*(?:bước|step)?/i);
      const mNum = text.match(/(\d+(?:[.,]\d+)?)\s*(?:bước|step)?/i);
      let amt = 500;
      if (mK) {
        amt = Math.round(parseFloat(mK[1].replace(',', '.')) * 1000);
      } else if (mNum) {
        amt = Math.round(parseFloat(mNum[1].replace(',', '.')));
      }
      return { action: 'add_steps', params: { amount: amt > 0 ? amt : 500 } };
    }

    // 5. Báo cáo / Tổng kết công việc & dòng tiền
    const isReportTask = ['nộp', 'làm', 'viết', 'gửi', 'soạn', 'hoàn thành'].some(k => text.includes(k));
    if (!isReportTask && ['báo cáo', 'tổng kết', 'tiến độ', 'tình hình', 'việc hôm nay', 'summary', 'status'].some(k => text.includes(k))) {
      return { action: 'get_summary', params: {} };
    }

    // 6. GHI CHÉP THU CHI TÀI CHÍNH (HỖ TRỢ MỌI ĐỊNH DẠNG: 150k, 2tr, thêm giải trí 150k, v.v.)
    const mK = text.match(/(\d+(?:[.,]\d+)?)\s*(?:k|nghìn|ngàn|cành)\b(?!\s*(?:bước|step|tiếng|h|phút))/i);
    const mTr = text.match(/(?:(\d+(?:[.,]\d+)?)\s*(?:tr|triệu|củ)\b|(\d+(?:[.,]\d+)?)\s*m(?![a-z]))/i);
    const mNum = text.match(/(\d{1,3}(?:[.,]\d{3})+|\d{4,9})\s*(?:đ|vnd|đồng)\b/i);

    const hasFinanceKeyword = ['chi', 'thu', 'tiêu', 'mua', 'trả', 'nạp', 'lương', 'thưởng', 'giải trí', 'ăn', 'uống', 'cf', 'cà phê', 'xăng', 'tiền', 'vé', 'shopee', 'grab', 'spent', 'pay'].some(k => text.includes(k));

    let amount = 0;
    if (mK) {
      amount = parseFloat(mK[1].replace(',', '.')) * 1000;
    } else if (mTr) {
      const valStr = mTr[1] || mTr[2];
      amount = parseFloat(valStr.replace(',', '.')) * 1000000;
    } else if (mNum) {
      amount = parseInt(mNum[1].replace(/[.,]/g, ''), 10);
    }

    if (amount > 0 && (hasFinanceKeyword || text.startsWith('thêm') || text.startsWith('ghi'))) {
      const isIncome = ['thu', 'nạp', 'lương', 'thưởng', 'nhận tiền', 'income', 'được cho'].some(k => text.includes(k));
      let title = text.replace(/^(thêm\s*(khoản|mục)?|ghi\s*(chép)?|nhập|lưu|vừa)?\s*(chi|thu|tiêu|mua|trả|nạp)?\s*/i, '');
      title = title.replace(/\b(\d+(?:[.,]\d+)?\s*(?:k|nghìn|ngàn|cành|tr|triệu|củ|m|đ|vnd|đồng)?)\b/gi, '');
      title = title.replace(/hết|khoản|tiền/gi, '').trim();
      title = title.replace(/^[ :,\-]+|[ :,\-]+$/g, '').trim();
      if (!title) {
        title = isIncome ? 'Thu nhập' : 'Khoản chi';
      }

      let category = 'Khác';
      const tLower = (title + ' ' + text).toLowerCase();
      if (isIncome) {
        category = (tLower.includes('thưởng') || tLower.includes('bonus')) ? 'Thưởng' : 'Lương & Thưởng';
      } else {
        if (tLower.includes('giải trí') || tLower.includes('phim') || tLower.includes('game') || tLower.includes('cinema') || tLower.includes('vé') || tLower.includes('du lịch') || tLower.includes('chơi')) {
          category = 'Giải trí';
        } else if (tLower.includes('ăn') || tLower.includes('uống') || tLower.includes('cf') || tLower.includes('cà phê') || tLower.includes('cơm') || tLower.includes('phở') || tLower.includes('bánh') || tLower.includes('trà sữa')) {
          category = 'Ăn uống';
        } else if (tLower.includes('xăng') || tLower.includes('grab') || tLower.includes('taxi') || tLower.includes('xe') || tLower.includes('be')) {
          category = 'Di chuyển';
        } else if (tLower.includes('mua') || tLower.includes('shopee') || tLower.includes('áo') || tLower.includes('quần') || tLower.includes('sách') || tLower.includes('lazada')) {
          category = 'Mua sắm';
        } else if (tLower.includes('điện') || tLower.includes('nước') || tLower.includes('nhà') || tLower.includes('mạng') || tLower.includes('wifi') || tLower.includes('phòng') || tLower.includes('trọ')) {
          category = 'Hóa đơn';
        } else if (tLower.includes('thuốc') || tLower.includes('khám') || tLower.includes('gym') || tLower.includes('viện')) {
          category = 'Sức khỏe';
        } else if (tLower.includes('học') || tLower.includes('khóa học')) {
          category = 'Học tập';
        }
      }

      return {
        action: 'add_transaction',
        params: {
          title: title.charAt(0).toUpperCase() + title.slice(1),
          amount: Math.round(amount),
          type: isIncome ? 'income' : 'expense',
          category: category
        }
      };
    }

    // 7. THÊM CÔNG VIỆC / ĐẶT HẸN / LÊN LỊCH (PHÂN BIỆT RÕ RÀNG VỚI CÁC LỆNH KHÁC)
    // Chỉ nhận diện là THÊM LỊCH / THÊM VIỆC khi có từ khóa rõ ràng:
    const explicitAddTriggers = [
      'thêm việc', 'thêm task', 'tạo task', 'tạo việc', 'thêm nhiệm vụ',
      'lên lịch', 'đặt lịch', 'thêm lịch', 'đặt hẹn', 'lên hẹn', 'tạo lịch', 'xếp lịch',
      'nhắc tôi', 'nhắc việc', 'nhắc nhở', 'nhắc', 'hẹn tôi', 'add task', 'schedule'
    ];

    const futurePlanTriggers = [
      'mai có hẹn', 'hôm nay có hẹn', 'tối nay có hẹn', 'chiều mai có hẹn',
      'mai phải', 'hôm nay phải', 'chiều nay phải', 'sáng mai cần', 'tối nay cần'
    ];

    const hasAddKeyword = explicitAddTriggers.some(t => text.includes(t)) || futurePlanTriggers.some(t => text.includes(t));
    const hasTime = /(?:lúc|vào|hồi)?\s*(\d{1,2}[:h](\d{2})?|\d{1,2}\s*giờ)/i.test(text);

    // Nếu câu có thời gian nhưng KHÔNG có từ khóa thêm việc, CHỈ nhận là thêm việc nếu là dạng tiêu đề ngắn (VD: "Họp team 15:00", "Đi ăn tối 20h")
    // và TUYỆT ĐỐI KHÔNG chứa từ hỏi (gì, không, chưa, mấy giờ, thế nào)
    const isQuestion = ['gì', 'không', 'chưa', 'mấy giờ', 'sao', 'thế nào', '?'].some(q => text.includes(q));

    if (hasAddKeyword || (hasTime && !isQuestion && (text.includes('họp') || text.includes('gặp') || text.includes('nộp') || text.includes('khám')))) {
      const hour = normalizeScheduleHour(text);

      let deadline = 'today';
      if (text.includes('mai') || text.includes('tomorrow')) {
        deadline = 'tomorrow';
      } else if (text.includes('mốt') || text.includes('ngày kia')) {
        deadline = 'in_2_days';
      }

      const title = cleanTaskTitle(text, hour);

      return {
        action: 'add_task',
        params: {
          title: title,
          scheduleHour: hour,
          deadline: deadline
        }
      };
    }

    return null;
  }

  // --- RENDER CHAT BUBBLES ---
  function appendUserBubble(text) {
    const div = document.createElement('div');
    div.className = 'flex justify-end';
    div.innerHTML = `
      <div class="ai-msg-user max-w-[85%] px-4 py-2.5 rounded-2xl text-xs font-bold leading-relaxed break-words font-['Nunito']">
        ${escapeHtml(text)}
      </div>
    `;
    aiMessagesBox.appendChild(div);
    scrollChatToBottom();
  }

  function appendBotTypingIndicator() {
    const id = 'ai-typing-' + Date.now();
    const div = document.createElement('div');
    div.id = id;
    div.className = 'flex items-start gap-2.5';
    div.innerHTML = `
      <div class="w-8 h-8 rounded-xl bg-[#226f54] text-white flex items-center justify-center font-black text-xs shrink-0 border-2 border-slate-900 shadow-[1px_1px_0px_#1e293b] mt-0.5 font-['Nunito']">
        AI
      </div>
      <div class="ai-msg-bot px-3.5 py-2.5 rounded-2xl text-xs font-bold border flex items-center gap-1.5 text-slate-700 font-['Nunito']">
        <span class="inline-block w-2 h-2 rounded-full bg-[#226f54] animate-pulse"></span>
        <span class="inline-block w-2 h-2 rounded-full bg-[#226f54] animate-pulse delay-100"></span>
        <span class="inline-block w-2 h-2 rounded-full bg-[#226f54] animate-pulse delay-200"></span>
        <span class="ml-1 text-[11px] text-slate-600 font-bold">Đang suy nghĩ...</span>
      </div>
    `;
    aiMessagesBox.appendChild(div);
    scrollChatToBottom();
    return id;
  }

  function removeBotTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function appendBotBubble(contentHtml, actionBadge = null) {
    const div = document.createElement('div');
    div.className = 'flex items-start gap-2.5';
    
    let badgeHtml = '';
    if (actionBadge) {
      badgeHtml = `
        <div class="mt-2 pt-2 border-t-2 border-slate-900/10 dark:border-slate-700">
          <span class="ai-action-pill ai-action-success">
            <i class="fa-solid fa-circle-check text-emerald-600 dark:text-emerald-400"></i>
            <span>${escapeHtml(actionBadge)}</span>
          </span>
        </div>
      `;
    }

    div.innerHTML = `
      <div class="w-8 h-8 rounded-xl bg-[#226f54] text-white flex items-center justify-center font-black text-xs shrink-0 border-2 border-slate-900 shadow-[1px_1px_0px_#1e293b] mt-0.5 font-['Nunito']">
        AI
      </div>
      <div class="ai-msg-bot max-w-[85%] px-4 py-3 rounded-2xl text-xs font-bold border-2 border-slate-900 bg-white text-slate-900 shadow-[1.5px_1.5px_0px_#1e293b] leading-relaxed break-words font-['Nunito']">
        <div>${formatBotMarkdown(contentHtml)}</div>
        ${badgeHtml}
      </div>
    `;
    aiMessagesBox.appendChild(div);
    scrollChatToBottom();
  }

  function formatBotMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400 font-mono text-[11px]">$1</code>')
      .replace(/\n\s*-\s+(.*?)(?=\n|$)/g, '<li class="ml-4 list-disc">$1</li>')
      .replace(/\n/g, '<br>');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function scrollChatToBottom() {
    if (aiMessagesBox) {
      aiMessagesBox.scrollTo({ top: aiMessagesBox.scrollHeight, behavior: 'smooth' });
    }
  }

  function renderInitialWelcomeMessage() {
    if (!aiMessagesBox) return;
    aiMessagesBox.innerHTML = '';
    const welcomeVi = `Chào bạn! Tôi là trợ lý AI quản lý lịch trình và sức khỏe. Hôm nay bạn cần hỗ trợ gì?`;
    const welcomeEn = `Hello! I am your AI assistant for schedule and health management. How can I assist you today?`;

    appendBotBubble(currentLang === 'en' ? welcomeEn : welcomeVi);
  }

  // --- HANDLE CHAT SUBMISSION (DUAL ENGINE TỐI ƯU SIÊU TỐC) ---
  async function handleChatSubmit(promptText) {
    const rawText = promptText.trim();
    if (!rawText) return;

    appendUserBubble(rawText);
    if (aiChatInput) aiChatInput.value = '';
    const typingId = appendBotTypingIndicator();

    const lower = rawText.toLowerCase().trim();

    // 1. Phản hồi chào hỏi thông thường TỨC THÌ (dưới 50ms, không cần chờ mạng)
    if (['hi', 'hello', 'hey', 'xin chào', 'chào bạn', 'chào bot', 'chào', 'alo', 'ê', 'hello bot'].includes(lower)) {
      removeBotTypingIndicator(typingId);
      const greeting = currentLang === 'en'
        ? 'Hello! I am ready. You can ask me to add tasks, log expenses, or switch views anytime!'
        : 'Chào bạn! Tôi đã sẵn sàng. Bạn có thể yêu cầu tôi thêm việc, ghi thu chi hoặc chuyển trang bất cứ lúc nào!';
      appendBotBubble(greeting);
      return;
    }

    // 2. Thực thi tức thì nếu chưa có API Key hoặc lệnh giao diện/hỗ trợ
    const localIntent = parseLocalIntent(rawText);
    if (!geminiApiKey && localIntent) {
      removeBotTypingIndicator(typingId);
      const actRes = executeAppAction(localIntent.action, localIntent.params);
      appendBotBubble(actRes.message, actRes.badgeText);
      return;
    }

    if (localIntent && ['optimize_schedule', 'get_capabilities', 'toggle_theme', 'toggle_language', 'navigate_view', 'clean_completed_tasks', 'add_water', 'add_steps', 'delete_task', 'delete_transaction', 'search_task', 'open_notifications', 'log_sleep', 'set_health_goals', 'get_health_status', 'toggle_health_reminder', 'reset_health_today', 'complete_task', 'get_schedule', 'add_project'].includes(localIntent.action)) {
      removeBotTypingIndicator(typingId);
      const actRes = executeAppAction(localIntent.action, localIntent.params);
      appendBotBubble(actRes.message, actRes.badgeText);
      return;
    }

    // 3. Gọi Google Gemini API với bộ đệm Timeout 6s (hỗ trợ cả Function Calling lẫn Google Search thời gian thực)
    if (geminiApiKey) {
      try {
        const sysInstruction = `Bạn là MyLife AI Copilot - trợ lý cá nhân thông minh trong ứng dụng của người dùng. Bạn ĐÃ ĐƯỢC TÍCH HỢP GOOGLE SEARCH THỜI GIAN THỰC (real-time web search), cho phép tra cứu trực tiếp giá vàng hôm nay, tỷ giá, thời tiết, tin tức mới nhất.
Đồng thời bạn có toàn quyền gọi các công cụ thực thi nội bộ:
1. add_task: BẮT BUỘC CHỈ GỌI khi người dùng THỰC SỰ muốn tạo mới/lên lịch một việc/lịch hẹn. Chấp nhận mọi định dạng giờ: 20h -> scheduleHour: '20:00', 8h tối -> scheduleHour: '20:00', 14h30 -> scheduleHour: '14:30', cả ngày -> scheduleHour: 'allday'. TUYỆT ĐỐI KHÔNG GỌI add_task khi người dùng muốn đánh dấu hoàn thành, xem lịch, xóa việc hay hỏi đáp!
2. complete_task: BẮT BUỘC GỌI khi người dùng yêu cầu đánh dấu đã hoàn thành, xong việc, hoàn tất (VD: 'đánh dấu cuộc họp lúc 20h đã hoàn thành', 'hoàn thành việc slide lúc 15:00', 'đã xong việc nghiên cứu transformer').
3. get_schedule: BẮT BUỘC GỌI khi người dùng xem hoặc hỏi lịch trình (VD: 'lịch hôm nay có gì', 'hôm nay có lịch gì không', 'xem lịch lúc 20h').
4. add_project: BẮT BUỘC GỌI khi người dùng yêu cầu tạo/thêm phân loại, dự án mới (VD: 'thêm phân loại Nghiên cứu AI', 'tạo dự án Freelance').
5. delete_task: BẮT BUỘC GỌI khi người dùng yêu cầu xóa việc, hủy lịch hẹn (VD: 'xóa tất cả công việc lúc 6h sáng mai', 'xóa việc nghiên cứu transformer').
6. search_task: BẮT BUỘC GỌI khi người dùng tìm kiếm công việc (VD: 'tìm kiếm công việc nghiên cứu transformer').
7. add_transaction, delete_transaction: Ghi nhận hoặc xóa thu chi, mua sắm (VD: 'thêm giải trí 150k', 'chi 45k cà phê', 'xóa khoản chi 45k').
8. open_notifications: Mở phần thông báo, chuông thông báo chung.
9. add_water, add_steps, log_sleep, set_health_goals, get_health_status, toggle_health_reminder: Quản lý sức khỏe, giấc ngủ, mục tiêu thể chất.
10. navigate_view: Chuyển trang ('overview', 'tasks', 'finance', 'health', 'settings').
11. toggle_theme, toggle_language, clean_completed_tasks, get_summary.
Quy tắc: Khi người dùng yêu cầu tác vụ, BẮT BUỘC PHẢI GỌI FUNCTION CALL, không được chỉ nói bằng văn bản suông. Trả lời súc tích, thân thiện bằng ${currentLang === 'en' ? 'tiếng Anh' : 'tiếng Việt'}.`;

        // Chỉ truyền lịch sử dạng văn bản sạch để tránh lỗi format Function Calling
        const cleanHistory = chatConversation.slice(-6).map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: typeof m.text === 'string' ? m.text : (m.parts?.[0]?.text || 'OK') }]
        }));

        // Tự động phân loại công cụ: Nếu hỏi thông tin trực tuyến (giá vàng, thời tiết...) thì nạp google_search, ngược lại nạp functionDeclarations
        const isSearchQuery = /giá vàng|thời tiết|tin tức|tỷ giá|chứng khoán|thế giới|tin nóng|kết quả|trận đấu|thời gian thực/i.test(rawText);
        const selectedTools = isSearchQuery ? geminiSearchTools : geminiAppTools;

        const requestBody = {
          systemInstruction: { parts: [{ text: sysInstruction }] },
          contents: [
            ...cleanHistory,
            { role: 'user', parts: [{ text: rawText }] }
          ],
          tools: selectedTools,
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 350
          }
        };

        const controller = new AbortController();
        const timeoutTimer = setTimeout(() => controller.abort(), 6000);

        let modelToUse = activeGeminiModel || 'gemini-3.8-flash';
        let res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${geminiApiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
          signal: controller.signal
        });

        clearTimeout(timeoutTimer);
        let data = await res.json();

        // Nếu gặp lỗi do công cụ, tự động thử lại ở chế độ hội thoại tự do thuần túy (không kèm tools)
        if (!res.ok && data.error?.message) {
          console.warn('[Tool conflict or error, retrying without tools for pure Q&A]');
          try {
            const retryRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${geminiApiKey}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                systemInstruction: requestBody.systemInstruction,
                contents: requestBody.contents,
                generationConfig: requestBody.generationConfig
              })
            });
            const retryData = await retryRes.json();
            if (retryRes.ok && retryData.candidates?.[0]) {
              res = retryRes;
              data = retryData;
            }
          } catch(e) {}
        }

        // Nếu Google báo model cũ hoặc gợi ý model mới, tự đổi và gọi lại
        if (!res.ok && data.error?.message) {
          const errMsg = data.error.message;
          const matchRec = errMsg.match(/models\/(gemini-[\w.\u2013\u2014-]+)/);
          if (matchRec && matchRec[1]) {
            const suggested = matchRec[1].replace(/[\u2013\u2014]/g, '-');
            console.log('[Chat auto-switching model to]', suggested);
            activeGeminiModel = suggested;
            localStorage.setItem('mylife_gemini_active_model', suggested);
            updateGeminiSettingsUI();
            res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${suggested}:generateContent?key=${geminiApiKey}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(requestBody)
            });
            data = await res.json();
          }
        }

        // Nếu hết quota (429), thử chuyển nhanh sang các model khác có quota riêng
        if (!res.ok && (res.status === 429 || data.error?.message?.includes('Quota exceeded') || data.error?.message?.includes('RESOURCE_EXHAUSTED'))) {
          console.warn('[Gemini 429 Quota Exceeded, attempting alternate models]');
          const altModels = ['gemini-3.5-flash-lite', 'gemini-2.0-flash', 'gemini-1.5-flash-8b'];
          for (const alt of altModels) {
            if (alt === modelToUse) continue;
            try {
              const altRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${alt}:generateContent?key=${geminiApiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
              });
              const altData = await altRes.json();
              if (altRes.ok && altData.candidates?.[0]) {
                res = altRes;
                data = altData;
                activeGeminiModel = alt;
                localStorage.setItem('mylife_gemini_active_model', alt);
                updateGeminiSettingsUI();
                break;
              }
            } catch(e) {}
          }
        }

        removeBotTypingIndicator(typingId);

        if (res.ok && data.candidates && data.candidates[0]) {
          const candidate = data.candidates[0];
          const parts = candidate.content?.parts || [];

          let botText = '';
          let actionResults = [];

          for (const p of parts) {
            if (p.text) {
              botText += p.text + ' ';
            }
            if (p.functionCall) {
              const fCall = p.functionCall;
              const resAct = executeAppAction(fCall.name, fCall.args);
              actionResults.push(resAct);
            }
          }

          // Trích xuất nguồn tìm kiếm thời gian thực (nếu có từ Google Search Grounding)
          let searchSourcesHtml = '';
          if (candidate.groundingMetadata?.groundingChunks?.length > 0) {
            const sources = candidate.groundingMetadata.groundingChunks
              .filter(c => c.web?.uri && c.web?.title)
              .slice(0, 3)
              .map(c => `<a href="${c.web.uri}" target="_blank" rel="noopener noreferrer" class="text-blue-500 dark:text-blue-400 hover:underline block truncate">• ${escapeHtml(c.web.title)}</a>`)
              .join('');
            if (sources) {
              searchSourcesHtml = `<div class="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400"><strong><i class="fa-solid fa-earth-americas text-blue-500 mr-1"></i>Nguồn trực tuyến (Google Search):</strong>${sources}</div>`;
            }
          }

          // Cập nhật conversation history dạng văn bản an toàn
          const finalReply = botText.trim() || (actionResults[0]?.message || 'Đã xử lý yêu cầu.');
          chatConversation.push({ role: 'user', text: rawText });
          chatConversation.push({ role: 'model', text: finalReply });

          if (actionResults.length > 0) {
            for (const act of actionResults) {
              const msg = (botText.trim() || act.message) + searchSourcesHtml;
              appendBotBubble(msg, act.badgeText);
            }
          } else {
            // Safeguard: Nếu Gemini chỉ phản hồi dạng văn bản mà bỏ quên Function Call, tự động thi hành tác vụ
            if (localIntent && ['optimize_schedule', 'add_task', 'delete_task', 'delete_transaction', 'search_task', 'open_notifications', 'log_sleep', 'set_health_goals', 'get_health_status', 'toggle_health_reminder', 'reset_health_today', 'complete_task', 'get_schedule', 'add_project', 'add_transaction', 'add_water', 'add_steps', 'navigate_view', 'toggle_theme', 'toggle_language', 'clean_completed_tasks'].includes(localIntent.action)) {
              const actRes = executeAppAction(localIntent.action, localIntent.params);
              const combinedMsg = (botText.trim() ? botText.trim() + '\n\n' : '') + actRes.message + searchSourcesHtml;
              appendBotBubble(combinedMsg, actRes.badgeText);
            } else {
              appendBotBubble(finalReply + searchSourcesHtml);
            }
          }
          return;
        } else {
          console.warn('[Gemini API Fallback triggered]', data);
        }
      } catch (err) {
        console.error('[Gemini API Call Error or Timeout, using Local Parser]', err);
      }
    }

    // 4. Chế độ Local Smart Intent Parser (Fallback siêu tốc khi mạng chậm hoặc API lỗi)
    removeBotTypingIndicator(typingId);
    if (localIntent) {
      const actRes = executeAppAction(localIntent.action, localIntent.params);
      let reply = actRes.message;
      if (geminiApiKey) {
        reply += currentLang === 'en'
          ? '\n\n*(Notice: Google Gemini Free quota reached daily limit. Copilot automatically executed this via the Smart Local Engine!)*'
          : '\n\n*(Lưu ý: Google Gemini đã chạm giới hạn 20 yêu cầu/ngày của gói Free. Copilot đã tự động thực thi qua Động cơ Nội bộ siêu tốc để phục vụ bạn trơn tru!)*';
      }
      appendBotBubble(reply, actRes.badgeText);
    } else {
      const helpVi = `Tôi chưa nhận diện được yêu cầu "${escapeHtml(rawText)}". Bạn có thể thử các mẫu lệnh sau:
- "Thêm việc: Làm báo cáo tiến độ lúc 15:00"
- "Ghi chi 45.000đ cà phê sáng"
- "Chuyển sang trang tài chính"
- "Bật giao diện tối"
- "Báo cáo tiến độ hôm nay"`;

      const helpEn = `I didn't recognize "${escapeHtml(rawText)}". Try:
- "Add task: Review design at 15:00"
- "Spend 50k on lunch"
- "Switch to finance view"
- "Turn on dark mode"
- "Report today progress"`;

      appendBotBubble(currentLang === 'en' ? helpEn : helpVi);
    }
  }

  // --- AI COPILOT WINDOW CONTROLLER (MỤC LỤC + THU NHỎ KÉO THẢ) ---
  const openAiCopilot = () => {
    if (!aiDrawer) return;
    aiDrawer.classList.remove('hidden');
    aiMiniBubble?.classList.add('hidden');
    aiChatInput?.focus();
  };

  const minimizeAiCopilot = () => {
    if (!aiDrawer) return;
    aiDrawer.classList.add('hidden');
    if (aiMiniBubble) {
      aiMiniBubble.classList.remove('hidden');
      clampBubblePosition();
    }
  };

  const closeAiCopilot = () => {
    aiDrawer?.classList.add('hidden');
    aiMiniBubble?.classList.add('hidden');
  };

  const toggleAiCopilotFromNav = () => {
    const isDrawerOpen = aiDrawer && !aiDrawer.classList.contains('hidden');
    const isBubbleVisible = aiMiniBubble && !aiMiniBubble.classList.contains('hidden');
    if (isDrawerOpen) {
      minimizeAiCopilot();
    } else {
      openAiCopilot();
    }
  };

  // Mở từ thanh mục lục (Nav tab & Header pill)
  aiPillChatBtn?.addEventListener('click', toggleAiCopilotFromNav);
  aiNavChatBtn?.addEventListener('click', toggleAiCopilotFromNav);

  // Nút Thu Nhỏ thành icon kéo thả
  aiMinimizeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    minimizeAiCopilot();
  });

  // Nút Đóng hoàn toàn (xóa khỏi màn hình)
  aiCloseBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAiCopilot();
  });

  // --- DRAGGABLE CONTROLLER CHO ICON MINI THU NHỎ ---
  const clampBubblePosition = () => {
    if (!aiMiniBubble || aiMiniBubble.classList.contains('hidden')) return;
    const rect = aiMiniBubble.getBoundingClientRect();
    const w = rect.width || 48;
    const h = rect.height || 48;
    const maxLeft = Math.max(10, window.innerWidth - w - 10);
    const maxTop = Math.max(10, window.innerHeight - h - 10);
    const curLeft = rect.left;
    const curTop = rect.top;

    let targetLeft = Math.min(Math.max(10, curLeft), maxLeft);
    let targetTop = Math.min(Math.max(10, curTop), maxTop);

    aiMiniBubble.style.left = `${targetLeft}px`;
    aiMiniBubble.style.top = `${targetTop}px`;
    aiMiniBubble.style.right = 'auto';
    aiMiniBubble.style.bottom = 'auto';
  };

  // Khôi phục vị trí đã lưu của icon thu nhỏ
  try {
    const savedPos = localStorage.getItem('mylife_ai_bubble_pos');
    if (savedPos && aiMiniBubble) {
      const parsed = JSON.parse(savedPos);
      if (typeof parsed.left === 'number' && typeof parsed.top === 'number') {
        const maxLeft = Math.max(10, window.innerWidth - 58);
        const maxTop = Math.max(10, window.innerHeight - 58);
        const clampLeft = Math.min(Math.max(10, parsed.left), maxLeft);
        const clampTop = Math.min(Math.max(10, parsed.top), maxTop);
        aiMiniBubble.style.left = `${clampLeft}px`;
        aiMiniBubble.style.top = `${clampTop}px`;
        aiMiniBubble.style.right = 'auto';
        aiMiniBubble.style.bottom = 'auto';
      }
    }
  } catch (err) {}

  window.addEventListener('resize', clampBubblePosition);

  // Kéo thả icon thu nhỏ linh hoạt (Hỗ trợ cả Chuột & Cảm ứng)
  if (aiMiniBubble) {
    let isDraggingBubble = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let bubbleInitLeft = 0;
    let bubbleInitTop = 0;
    let hasMoved = false;

    const startDrag = (clientX, clientY) => {
      isDraggingBubble = true;
      hasMoved = false;
      dragStartX = clientX;
      dragStartY = clientY;

      const rect = aiMiniBubble.getBoundingClientRect();
      bubbleInitLeft = rect.left;
      bubbleInitTop = rect.top;
      aiMiniBubble.classList.add('scale-95');
    };

    const moveDrag = (clientX, clientY) => {
      if (!isDraggingBubble) return;
      const dx = clientX - dragStartX;
      const dy = clientY - dragStartY;

      if (Math.hypot(dx, dy) > 5) {
        hasMoved = true;
      }

      let nextLeft = bubbleInitLeft + dx;
      let nextTop = bubbleInitTop + dy;

      const w = aiMiniBubble.offsetWidth || 48;
      const h = aiMiniBubble.offsetHeight || 48;
      const maxLeft = Math.max(10, window.innerWidth - w - 10);
      const maxTop = Math.max(10, window.innerHeight - h - 10);

      nextLeft = Math.min(Math.max(10, nextLeft), maxLeft);
      nextTop = Math.min(Math.max(10, nextTop), maxTop);

      aiMiniBubble.style.left = `${nextLeft}px`;
      aiMiniBubble.style.top = `${nextTop}px`;
      aiMiniBubble.style.right = 'auto';
      aiMiniBubble.style.bottom = 'auto';
    };

    const endDrag = () => {
      if (!isDraggingBubble) return;
      isDraggingBubble = false;
      aiMiniBubble.classList.remove('scale-95');

      if (hasMoved) {
        const rect = aiMiniBubble.getBoundingClientRect();
        try {
          localStorage.setItem('mylife_ai_bubble_pos', JSON.stringify({
            left: Math.round(rect.left),
            top: Math.round(rect.top)
          }));
        } catch (e) {}
      } else {
        // Nếu chỉ bấm (không kéo) -> Phóng to lại khung chat
        openAiCopilot();
      }
    };

    // Chuột
    aiMiniBubble.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      startDrag(e.clientX, e.clientY);
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (isDraggingBubble) {
        moveDrag(e.clientX, e.clientY);
      }
    });

    window.addEventListener('mouseup', () => {
      if (isDraggingBubble) {
        endDrag();
      }
    });

    // Cảm ứng / Mobile
    aiMiniBubble.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (isDraggingBubble && e.touches && e.touches[0]) {
        moveDrag(e.touches[0].clientX, e.touches[0].clientY);
        e.preventDefault();
      }
    }, { passive: false });

    window.addEventListener('touchend', () => {
      if (isDraggingBubble) {
        endDrag();
      }
    });
  }

  aiClearBtn?.addEventListener('click', () => {
    chatConversation = [];
    renderInitialWelcomeMessage();
  });

  aiOpenSettingsBtn?.addEventListener('click', () => {
    switchMainView('settings');
    const geminiCard = document.getElementById('setting-card-gemini');
    if (geminiCard) {
      geminiCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      geminiCard.classList.add('ring-4', 'ring-indigo-400', 'transition-all');
      setTimeout(() => {
        geminiCard.classList.remove('ring-4', 'ring-indigo-400');
      }, 2000);
    }
  });

  aiChatForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = aiChatInput?.value || '';
    handleChatSubmit(val);
  });

  // Suggestion Chips Click
  document.querySelectorAll('.ai-sample-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const prompt = btn.getAttribute('data-prompt') || btn.textContent.trim();
      handleChatSubmit(prompt);
    });
  });

  // Khởi tạo Gemini UI & Greeting
  updateGeminiSettingsUI();
  renderInitialWelcomeMessage();

  // Nạp dữ liệu phân vùng biệt lập cho tài khoản đang hoạt động
  loadAccountData(activeAccountId);

  // Initial render of user guide & global language initialization
  renderUserGuide();
  applyLanguage(currentLang);

  // Mặc định hiển thị tab Tổng quan (overview) ở vị trí đầu tiên
  const initialView = localStorage.getItem('mylife_active_view') || 'overview';
  switchMainView(initialView);

  // Firebase Authentication là nguồn xác thực duy nhất; không tin cờ LocalStorage.
  const firebaseAuth = window.MyLifeFirebase?.auth;
  if (firebaseAuth) {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (!user) {
        localStorage.removeItem('mylife_google_auth_done');
        openGoogleAuthScreen();
        return;
      }

      try {
        await handleFirebaseUserLoginSuccess(user);
      } catch (err) {
        console.error('[MyLife] Không thể khôi phục phiên Firebase:', err);
        localStorage.removeItem('mylife_google_auth_done');
        openGoogleAuthScreen();
        alert('Không thể tải phiên làm việc. Vui lòng thử đăng nhập lại. ' + (err.message || ''));
      }
    });
  } else {
    localStorage.removeItem('mylife_google_auth_done');
    openGoogleAuthScreen();
  }

  // Không tự đồng bộ khi chưa xác thực Firebase.
  // Chỉ onAuthStateChanged mới cho phép khôi phục phiên và tải dữ liệu.

});
